import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ReminderPreference } from './users.dto';

@Schema({ _id: true, id: true, timestamps: true })
export class User {
  _id: Types.ObjectId;
  id: string;

  @Prop({ required: true, unique: true })
  chatId: number;

  @Prop({
    type: String,
    enum: Object.values(ReminderPreference),
    default: ReminderPreference.DAILY,
  })
  reminderPreference: ReminderPreference;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
