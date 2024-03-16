import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word } from './words.schema';

@Injectable()
export class WordsDalService {
  constructor(@InjectModel('Word') private readonly wordModel: Model<Word>) {}

  findAll(): Promise<Word[]> {
    return this.wordModel.find().lean();
  }
}
