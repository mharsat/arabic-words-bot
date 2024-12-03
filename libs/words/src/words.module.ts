import { Logger, Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsDalService } from './dal/words.dal';
import { MongooseModule } from '@nestjs/mongoose';
import { WordSchema } from './dal/words.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Word', schema: WordSchema }])],
  providers: [WordsService, WordsDalService, Logger],
  exports: [WordsService],
})
export class WordsModule {}
