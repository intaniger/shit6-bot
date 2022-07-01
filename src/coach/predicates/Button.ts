import { ButtonInteraction } from 'discord.js';
import { EventHandling } from '../EventHandling';
import { ButtonIds } from '../interaction.types';
import Logics from '../Logics';
import InteractionPred from './Interaction';

export default class ButtonPred extends EventHandling<ButtonInteraction> {
  public static isClickedButtonId =
  (buttonId: ButtonIds) => new Logics<EventHandling<ButtonInteraction>>(
    InteractionPred.isButton,
  )
    .and((i) => i.customId === buttonId)
    .predicate
}
