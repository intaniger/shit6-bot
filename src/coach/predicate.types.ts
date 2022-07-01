import { EventHandling } from './EventHandling';

export type ElementTypeOf<T> = T extends EventHandling<infer I> ? I : never;

export type ConditionPredicate<C> = (arg: ElementTypeOf<C>, t: C) => boolean | Promise<boolean>;

export type IPredicates<C, K extends keyof Record<string, unknown>> = {
    [k in K]: ConditionPredicate<C>;
  };
