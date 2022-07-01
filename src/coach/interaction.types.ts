import { Interaction, Message } from 'discord.js';

export enum ButtonIds {
  IWillGiveYouAChanceToGuess = 'ไอหน้าหี กูให้มึงเดาของกู เดาซะไอหัวควย 49, 52, 56',
  FreedomOfSpeechGaveMeChanceToSayMyFuckingWords = '65 คร้าฟ',
  YesButton = 'จั้ย',
  NoButton = 'ไม่จั้ย'

}

export enum HandlersName {
  HeyPreeJouey = 'Hey! Pree Jouey.',
  KarbTue = 'Karb Tue',
  MayIGetTheRefCode = 'May I, received your honour\' ref code?',
  YourRoyalHighness = 'YourRoyalHighness',
  RESET = 'RESET',
  DM = 'DM'
}

export type InteractionElementsType = Interaction | Message
