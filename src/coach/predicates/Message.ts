import { DMChannel, Message } from 'discord.js';
import { EventHandling } from '../EventHandling';
import { ConditionPredicate } from '../predicate.types';

export default class MessagePred extends EventHandling<Message> {
  public static isBot: ConditionPredicate<MessagePred> =
  (m) => m.author.id === m.client.user?.id

  public static isMentioned: ConditionPredicate<MessagePred> =
  (m: Message) => m.mentions.members?.has(m.client.user?.id ?? '') ?? false

  public static isDM: ConditionPredicate<MessagePred> =
  (m: Message) => m.channel instanceof DMChannel
}
