import { EventHandling } from '../EventHandling';
import { HandlersName } from '../interaction.types';
import { ConditionPredicate } from '../predicate.types';

export default class SystemPred extends EventHandling {
  public static enableOnlyAfter =
  (targetHdlrName: HandlersName): ConditionPredicate<SystemPred> => (i, t) => t
    .coach
    .invocationsHistory(t.AuthorId)
    .includes(targetHdlrName)

  public static continouslyAtMostNTimes =
  (name: HandlersName) => (numberOfTimes: number): ConditionPredicate<SystemPred> => (_, t) => t
    .coach
    .invocationsHistory(t.AuthorId)
    .slice(-1 * numberOfTimes)
    .filter((i) => i !== name).length > 0;
}
