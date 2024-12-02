import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word } from './words.schema';

interface WordsFilter {
  fromDate?: Date;
}

@Injectable()
export class WordsDalService {
  constructor(@InjectModel('Word') private readonly wordModel: Model<Word>) {}

  findAll(filter?: WordsFilter): Promise<Word[]> {
    const query = filter?.fromDate
      ? { createdAt: { $gt: filter.fromDate } }
      : {};
    return this.wordModel.find(query).lean();
  }
}
