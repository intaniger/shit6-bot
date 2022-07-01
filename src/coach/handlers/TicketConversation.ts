import { Message } from 'discord.js';
import path from 'path';
import { toFile } from 'qrcode';
import { CheckInModel } from '../../models/CheckIn';
import { EventHandling, Handle } from '../EventHandling';
import Logics from '../Logics';
import MessagePred from '../predicates/Message';
import { VerifyStatus } from '../state.types';

export default class TicketConversation extends EventHandling<Message> {
  @Handle(
    new Logics(MessagePred.isDM)
      .and(Logics.not(MessagePred.isBot))
      .and((m, t: TicketConversation) => t.state.state === VerifyStatus.WaitingForFullname)
      .predicate,
  )(undefined)
  public async onFullnameReceived(m: Message) {
    await CheckInModel.updateOne(
      {
        RefCode: this.state.possiblecodes[0],
        DiscordId: m.author.id,
      },
      { $set: { Fullname: m.content, Status: VerifyStatus.WaitingForATK } },
    )
      .exec();
    this.setState({ state: VerifyStatus.WaitingForATK });
    this.state.roles?.userRole?.add(this.state.roles.atkAwaitRole!);
    m.channel.send(`Ref code: ${this.state.possiblecodes[0]} นะค้าบ\nรบกวนขั้นตอนสุดท้าย ส่งผลตรวจ ATK มาทาง DM เพื่อรับ token เข้างานนะค้าบ`);
  }

  @Handle(
    new Logics(MessagePred.isDM)
      .and(Logics.not(MessagePred.isBot))
      .and((m, t: TicketConversation) => t.state.state === VerifyStatus.WaitingForATK)
      .and((m) => m.attachments.size > 0)
      .predicate,
  )(undefined)
  public async onATKReceived(m: Message) {
    await CheckInModel.updateOne(
      {
        RefCode: this.state.possiblecodes[0],
        DiscordId: m.author.id,
      },
      { $set: { Status: VerifyStatus.Completed } },
    ).exec();
    this.setState({ state: VerifyStatus.Completed });
    const filename = path.join(process.cwd(), 'assets', `${this.state.possiblecodes[0]}.jpg`);
    await toFile(filename, this.state.possiblecodes[0], { errorCorrectionLevel: 'H', version: 1 });
    this.state.roles?.userRole?.add(this.state.roles.verified!);
    m.channel.send({ content: 'here is your ticket:', files: [filename] });
  }
}
