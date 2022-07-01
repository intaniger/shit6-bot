import { GuildMemberRoleManager, Role } from 'discord.js';
import GuessingInteraction from './handlers/GuessingInteraction';
import ATCConversation from './handlers/ReceptionConversation';
import TicketConversation from './handlers/TicketConversation';
import { HandlersName } from './interaction.types';

export interface Handlers {
  Message: readonly [
    ATCConversation,
    TicketConversation
  ];
  Interaction: readonly [
    GuessingInteraction
  ];
}

export enum VerifyStatus {
  Guessing = 'Guessing',
  WaitingForFullname = 'WaitingForFullname',
  WaitingForATK = 'WaitingForATK',
  Completed = 'Completed'
}

export interface SystemState {
  _internal: {
      promise?: Promise<unknown>;
      invocations: HandlersName[];
  }
}

export interface IndividualState extends SystemState {
  state: VerifyStatus;
  missingIndex: number[]
  possiblecodes: string[]
  guessingCharacter: string
  guessingIndex: number
  roles?: {
    userRole?: GuildMemberRoleManager;
    fullnameAwaitRole?: Role;
    atkAwaitRole?: Role;
    verified?: Role;
  }
}
