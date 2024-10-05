import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ReminderFrequency } from './users.dto';

@Schema({ _id: true, id: true, timestamps: true })
export class User {
  _id: Types.ObjectId;
  id: string;

  @Prop({ required: true, unique: true })
  chatId: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    type: String,
    enum: Object.values(ReminderFrequency),
    default: ReminderFrequency.DAILY,
  })
  reminderFrequency: ReminderFrequency;

  @Prop({ default: false })
  isBlocked: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
