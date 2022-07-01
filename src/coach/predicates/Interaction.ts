import { Interaction } from 'discord.js';
import { EventHandling } from '../EventHandling';
import { ButtonIds } from '../interaction.types';
import { ConditionPredicate } from '../predicate.types';

export default class InteractionPred extends EventHandling<Interaction> {
  public static isButton: ConditionPredicate<InteractionPred> = (i) => i.isButton();
}
