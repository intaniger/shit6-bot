import {
  ButtonInteraction, Interaction, MessageActionRow, MessageButton,
} from 'discord.js';
import dayjs = require('dayjs');
import _ = require('lodash');
import { shuffle } from 'lodash';
import { thaiNumber, toCharMap } from '../utils/codes';
import { EventHandling, Handle } from '../EventHandling';
import { ButtonIds } from '../interaction.types';
import Logics from '../Logics';
import ButtonPred from '../predicates/Button';
import InteractionPred from '../predicates/Interaction';
import Guessing from '../utils/Guessing';
import { IndividualState, VerifyStatus } from '../state.types';
import { CheckInModel } from '../../models/CheckIn';
import { defaultState } from '../Coach';

export default class GuessingInteraction extends EventHandling<Interaction> {
  @Handle(
    new Logics<GuessingInteraction>(
      InteractionPred.isButton,
    )
      .and(
        new Logics(ButtonPred.isClickedButtonId(ButtonIds.YesButton))
          .or(ButtonPred.isClickedButtonId(ButtonIds.NoButton)),
      )
      .predicate,
  )(undefined)
  public async handleAnswer(bi: ButtonInteraction) {
    if (bi.customId === ButtonIds.YesButton) {
      const possiblecodes = toCharMap(this.state.possiblecodes)[this.state.guessingIndex][this.state.guessingCharacter];

      if (!possiblecodes || possiblecodes.length === 0) {
        bi.reply('พรี่เจยค้าบ โค้ดนีมันไม่มีในระบบ 😜\nลองให้เดารหัสใหม่ แท็กผมตามด้วยคำว่า `reset` เพื่อเริ่มใหม่นะเคิ้บพรี่เจยเคิ้บ');
        this.setState(defaultState);
        return;
      }

      this.setState({
        ...Guessing.updatePossibleCodes(possiblecodes),
      });
    } else {
      const meantCodes = toCharMap(this.state.possiblecodes)[this.state.guessingIndex][this.state.guessingCharacter];

      if (meantCodes) {
        this.setState({
          ...Guessing.updatePossibleCodes(this.state.possiblecodes.filter((code) => !(meantCodes.includes(code)))),
        });
      }

      if (!this.state.possiblecodes || this.state.possiblecodes.length === 0) {
        bi.reply('พรี่เจยค้าบ ไม่เจอโค้ดในระบบเลยอะเคิ้บ\nลองเดารหัสใหม่โดย แท็กผมตามด้วยคำว่า `reset` เพื่อเริ่มใหม่นะเคิ้บพรี่เจยเคิ้บ');
        this.setState(defaultState);
        return;
      }
    }

    console.log(this.state.possiblecodes);

    if (this.state.missingIndex.length > 0) {
      const guessingIndex = shuffle(this.state.missingIndex)[0];
      const guessingCharacter = Guessing.possibleCharsFromCodes(this.state.possiblecodes, guessingIndex, Math.random() > 0.7)[0];
      const buttons = [ButtonIds.YesButton, ButtonIds.NoButton]
        .map((id) => new MessageButton()
          .setCustomId(id)
          .setLabel(id)
          .setStyle('PRIMARY'));

      bi.reply({
        content: `เยี่ยมเลยเคิ้ฟพรี่เจย 🫡 <@${bi.user.id}> เกล้ากระผมจะลองเดาตัวที่ ${thaiNumber[guessingIndex + 1]} ต่อนะเคิ้บ มังคือ ${guessingCharacter} ใช่เป่า`,
        components: [buttons.reduce((actionRow, b) => actionRow.addComponents(b), new MessageActionRow())],
      });

      this.setState({ guessingCharacter, guessingIndex });
    } else {
      await bi.deferReply();

      this.setState({ state: VerifyStatus.WaitingForFullname, finalCode: this.state.possiblecodes[0] });
      const newCheckIn = new CheckInModel({
        DiscordUsername: bi.user.username,
        RefCode: this.state.possiblecodes[0],
        Status: VerifyStatus.WaitingForFullname,
        DiscordId: bi.user.id,
      });
      newCheckIn.save();
      const user = await this.discordClient.users.fetch(this.AuthorId);
      await user.createDM(true);
      user.dmChannel?.send('เอ้อะเอิ้ว ขอ ชื่อ-นามสกุล พรี่เจยหน่อยเคิ้บ');
      bi.editReply('หลังไมค์ไปละค้าบ เอ้อะเอิ้ว');

      const roles = {
        userRole: bi.guild?.members.cache.get(bi.user.id)?.roles,
        fullnameAwaitRole: bi.guild?.roles.cache.find((r) => r.name.includes('SHiT-FN3')),
        atkAwaitRole: bi.guild?.roles.cache.find((r) => r.name.includes('SHiT-FN7')),
        verified: bi.guild?.roles.cache.find((r) => r.name.includes('SHiT-FN-COMPLETE')),
      };

      this.setState({ roles });
      this.state.roles?.userRole?.add(this.state.roles.fullnameAwaitRole!);
    }
  }
}
