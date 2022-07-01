import {
  Client,
  Message, MessageActionRow, MessageButton,
} from 'discord.js';
import { shuffle } from 'lodash';
import { CheckIn, CheckInModel } from '../../models/CheckIn';
import Coach, { defaultState } from '../Coach';
import { EventHandling, Handle } from '../EventHandling';
import {
  ButtonIds, HandlersName,
} from '../interaction.types';
import Logics from '../Logics';
import MessagePred from '../predicates/Message';
import { VerifyStatus } from '../state.types';
import { thaiNumber } from '../utils/codes';
import Guessing from '../utils/Guessing';

export default class ReceptionConversation extends EventHandling<Message> {
  constructor(client: Client, authorId: string, coach: Coach) {
    super(client, authorId, coach);
    this.blocker = (
      CheckInModel
        .find({ DiscordId: this.AuthorId })
        .sort({ _id: 'desc' })
        .limit(1)
        .exec()
        .then((checkin: CheckIn[]) => {
          if (checkin.length === 0) return;
          this.setState({
            state: checkin[0].Status as VerifyStatus,
            finalCode: checkin[0].RefCode,
          });
        }));
  }

  @Handle(
    new Logics(MessagePred.isMentioned)
      .and(Logics.not(MessagePred.isBot))
      .predicate,
  )(HandlersName.HeyPreeJouey)
  public async onMentionedByGrounder(m: Message) {
    const globalizedContent = m.content.replace(/<@[0-9]+>/, '').replace(/๐|๑|๒|๓|๔|๕|๖|๗|๘|๙/, (a) => thaiNumber.indexOf(a).toString()).trim();
    if (globalizedContent.length === 0) return;
    const secredNumber = globalizedContent === 'เอิ้ว' ? '' : globalizedContent;

    const possiblecodes = this.state.possiblecodes.filter((code) => (secredNumber === '' ? !(/[0-9]/.test(code)) : code.includes(secredNumber)));
    this.setState({
      ...Guessing.updatePossibleCodes(possiblecodes),
    });
    console.log(possiblecodes, this.state.possiblecodes, this.state.missingIndex);

    const guessingIndex = shuffle(this.state.missingIndex)[0] || 2;
    const guessingCharacter = Guessing.possibleCharsFromCodes(possiblecodes, guessingIndex)[0];
    const buttons = [ButtonIds.YesButton, ButtonIds.NoButton]
      .map((id) => new MessageButton()
        .setCustomId(id)
        .setLabel(id)
        .setStyle('PRIMARY'));

    m.reply({
      content: `ส่าหวัดดีเคิ้บพรี่เจย 🫡 <@${m.author.id}> เกล้ากระผมก๋อลองเดาตัวที่ ${thaiNumber[guessingIndex + 1]} นะเคิ้บ มังคือ ${guessingCharacter} หรือป่ะค้าบ`,
      components: [buttons.reduce((actionRow, b) => actionRow.addComponents(b), new MessageActionRow())],
    });

    this.setState({ guessingCharacter, guessingIndex });
  }

  @Handle(
    new Logics(MessagePred.isMentioned)
      .and(Logics.not(MessagePred.isBot))
      .and((m) => m.content.includes('reset'))
      .predicate,
  )(HandlersName.RESET)
  public async reset(m: Message) {
    this.setState(defaultState);

    m.reply('Done, my peoples ݅');
  }

  @Handle(
    new Logics(MessagePred.isMentioned)
      .and(Logics.not(MessagePred.isBot))
      .and((m) => m.content.includes('dm') || m.content.includes('DM'))
      .and((m, t: ReceptionConversation) => t.state.state !== VerifyStatus.Guessing)
      .predicate,
  )(HandlersName.DM)
  public async resumeDM(m: Message) {
    const roles = {
      userRole: m.guild?.members.cache.get(m.author.id)?.roles,
      fullnameAwaitRole: m.guild?.roles.cache.find((r) => r.name.includes('SHiT-FN3')),
      atkAwaitRole: m.guild?.roles.cache.find((r) => r.name.includes('SHiT-FN7')),
      verified: m.guild?.roles.cache.find((r) => r.name.includes('SHiT-FN-COMPLETE')),
    };

    this.setState({ roles });

    const user = await this.discordClient.users.fetch(m.author.id);
    await user.createDM(true);
    user.dmChannel?.send('เอ้อะ เอ้อะ เอ้อะ เอ้อะเอิ้ว! กลับมาละค้าบ ส่งมาใหม่ได้เยย');
  }
}
