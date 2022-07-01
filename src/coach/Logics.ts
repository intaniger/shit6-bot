/* eslint-disable @typescript-eslint/no-explicit-any */

import { EventHandling } from './EventHandling';
import { ConditionPredicate } from './predicate.types';

export default class Logics<T extends EventHandling> {
  private p: ConditionPredicate<T>

  constructor(p: ConditionPredicate<T>) {
    this.p = p;
  }

  public get predicate(): ConditionPredicate<T> {
    return this.p;
  }

  public toString() {
    return 'Logics';
  }

  public static isLogics<E extends EventHandling>(a: any | Logics<E>): a is Logics<E> {
    return a.toString() === 'Logics';
  }

  public static not<E extends EventHandling>(operand: ConditionPredicate<E> | Logics<E>): Logics<E> {
    return new Logics((i, t) => Promise.all(
      [
        Logics.isLogics<E>(operand) ? operand.predicate(i, t) : operand(i, t),
      ],
    ).then(
      ([r]) => !r,
    ));
  }

  public and<E extends T>(operand: ConditionPredicate<E> | Logics<E>): Logics<E> {
    return new Logics((i, t) => Promise.all(
      [
        this.predicate(i, t),
      ],
    ).then(
      ([l]) => {
        if (l) { return Logics.isLogics<E>(operand) ? operand.predicate(i, t) : operand(i, t); }
        return false;
      },
    ));
  }

  public or<E extends T>(operand: ConditionPredicate<E> | Logics<E>): Logics<E> {
    return new Logics((i, t) => Promise.all(
      [
        this.predicate(i, t),
      ],
    ).then(
      ([l]) => (l || (Logics.isLogics<E>(operand) ? operand.predicate(i, t) : operand(i, t))),
    ));
  }
}
