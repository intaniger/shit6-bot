import { Schema, model } from 'mongoose';
import { VerifyStatus } from '../coach/state.types';

export interface CheckIn {
  Fullname: string;
  RefCode: string;
  Status: VerifyStatus;
  DiscordUsername: string;
  DiscordId: string;
}

export const CheckInSchema = new Schema<CheckIn>({
  Fullname: String,
  RefCode: { type: String, required: true },
  Status: { type: String, required: true },
  DiscordUsername: { type: String, required: true },
  DiscordId: { type: String, required: true },
});

export const CheckInModel = model<CheckIn>('CheckIn', CheckInSchema);
