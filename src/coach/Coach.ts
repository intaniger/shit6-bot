import { Client, Interaction, Message } from 'discord.js';
import { PartialDeep } from 'type-fest';
import _ = require('lodash');
import { EventHandling } from './EventHandling';
import ReceptionConversation from './handlers/ReceptionConversation';
import { HandlersName } from './interaction.types';
import { ElementTypeOf } from './predicate.types';
import { Handlers, IndividualState, VerifyStatus } from './state.types';
import refcodes from './utils/codes';
import GuessingInteraction from './handlers/GuessingInteraction';
import TicketConversation from './handlers/TicketConversation';

export const defaultState: IndividualState = {
  state: VerifyStatus.Guessing,
  _internal: { invocations: [] },
  missingIndex: [0, 1, 2, 3, 4, 5],
  possiblecodes: [...refcodes],
  guessingCharacter: '',
  guessingIndex: 0,
};

export default class Coach {
  constructor(
    client: Client,
    _defaultState: IndividualState = defaultState,
  ) {
    this.client = client;
    this.defaultState = _defaultState;
  }

  private _state: Record<string, IndividualState> = {};

  public invoked = (authorId: string) => (name: HandlersName) => {
    this._state[authorId]._internal.invocations.push(name);
  };

  public invocationsHistory = (authorId: string): Readonly<HandlersName[]> => this._state[authorId]._internal.invocations;

  public setBlocker = (authorId: string) => (promise?: Promise<unknown>) => {
    this._state[authorId]._internal.promise = promise;
  };

  public blocker = (authorId: string): Readonly<Promise<unknown> | undefined> => this._state[authorId]._internal.promise;

  public unblocked = (authorId: string) => {
    delete this._state[authorId]._internal.promise;
  };

  public state(authorId: string): Readonly<IndividualState> {
    return this._state[authorId];
  }

  public setStateByMerge(
    authorId: string,
    newState: PartialDeep<IndividualState> | unknown,
  ) {
    this._state[authorId] = _.mergeWith(this._state[authorId], newState, (a, b) => (_.isArray(b) ? b : undefined));
  }

  public handlers = (authorId: string): Readonly<Handlers> => this.handlersMap[authorId];

  protected defaultState: IndividualState;

  public readonly client: Client;

  public onDuty() {
    this.client.on('messageCreate', (m) => {
      if (!(m.author.id in this.handlersMap)) this.initiateNewSession(m.author.id);
      return this.invokeAllHandlers(m, 'Message', m.author.id);
    });

    this.client.on('interactionCreate', (i) => {
      if (!(i.user.id in this.handlersMap)) this.initiateNewSession(i.user.id);
      return this.invokeAllHandlers(i, 'Interaction', i.user.id);
    });
  }

  private handlersMap: Record<string, Handlers> = {};

  private spawnPersonalizedConversation = (authorId: string): Handlers => ({
    Message: [
      new ReceptionConversation(this.client, authorId, this),
      new TicketConversation(this.client, authorId, this),
    ],
    Interaction: [
      new GuessingInteraction(this.client, authorId, this),
    ],
  });

  private handleEvent =
    <T extends EventHandling>(i: ElementTypeOf<T>) => (h: T) => h.apply(i);

  private invokeAllHandlers = <T extends Message | Interaction>(
    i: T,
    type: keyof Handlers,
    authorId: string,
  ) => Promise.all(
      this.handlersMap[authorId][type] as readonly EventHandling<T>[],
  ).then((hs) => hs.forEach((h) => this.handleEvent(i)(h)));

  private initiateNewSession(id: string) {
    console.log(`Initiated new session for ${id}`);
    this._state[id] = _.cloneDeep(this.defaultState);
    this.handlersMap[id] = this.spawnPersonalizedConversation(id);
  }
}
