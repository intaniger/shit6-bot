/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { Client } from 'discord.js';
import 'reflect-metadata';
import { PartialDeep } from 'type-fest';
import Coach from './Coach';
import { HandlersName, InteractionElementsType } from './interaction.types';
import {
  ConditionPredicate,
  ElementTypeOf,
} from './predicate.types';
import { IndividualState } from './state.types';

export abstract class EventHandling<
  I extends InteractionElementsType = InteractionElementsType
> {
  protected readonly AuthorId: string;

  protected readonly discordClient: Client;

  private readonly _coach: Coach;

  public get coach() {
    return this._coach;
  }

  protected get state() {
    return this._coach.state(this.AuthorId);
  }

  protected setState(newState: PartialDeep<IndividualState> | unknown) {
    return this._coach.setStateByMerge(this.AuthorId, newState);
  }

  protected set blocker(promise: Promise<unknown> | undefined) {
    this.coach.setBlocker(this.AuthorId)(promise);
  }

  protected get blocker() {
    return this.coach.blocker(this.AuthorId);
  }

  protected unblocked = () => this.coach.unblocked(this.AuthorId);

  protected get handlers() {
    return this.coach.handlers(this.AuthorId);
  }

  constructor(client: Client, authorId: string, coach: Coach) {
    this.discordClient = client;
    this.AuthorId = authorId;
    this._coach = coach;
  }

  public async apply(i: I) {
    if (this.blocker !== undefined) {
      await this.blocker;
      this.unblocked();
    }
    Reflect.get(this, 'invokables').forEach(
      (fn: (interaction: I, ...args: unknown[]) => unknown) => fn.apply(this, [i]),
    );
  }
}

export const Handle = <T extends EventHandling>(...Conditions: ConditionPredicate<T>[]) => (name?: HandlersName) => (target: T, propertyKey: string, descriptor: PropertyDescriptor) => {
  const LowerOrderFunc = descriptor.value;
  const guardedFunction = async function (
    this: T,
    interaction: ElementTypeOf<T>,
    ...args: unknown[]
  ) {
    const predResult = await Conditions.reduce(
      (b, p) => Promise.all([b, p(interaction, this)]).then(
        (booleans: [boolean, boolean]) => booleans[0] && booleans[1],
      ),
      Promise.resolve(true),
    );

    if (predResult) {
      console.log(this.AuthorId, name);
      if (name) this.coach.invoked(this.AuthorId)(name);
      LowerOrderFunc.apply(this, [interaction, ...args]);
    }
  };

  Reflect.set(
    target,
    'invokables',
    (Reflect.get(target, 'invokables') || []).concat(guardedFunction),
  );
  return descriptor;
};
