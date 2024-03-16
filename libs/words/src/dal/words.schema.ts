import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ _id: true, id: true, timestamps: true })
export class Word {
  _id: Types.ObjectId;
  id: string;

  @Prop()
  arabic: string;

  @Prop()
  hebrew: string;

  @Prop()
  transliteration?: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);
export type WordDocument = Word & Document;
