import { Injectable } from '@nestjs/common';
import { Word } from './dal/words.schema';
import { WordsDalService } from './dal/words.dal';

const SHUFFLE_START_DATE = '2024-11-01';

@Injectable()
export class WordsService {
  // shuffeled words help us avoid repeating words for ordered use cases
  private shuffeledWords: Word[];

  constructor(private readonly wordsDalService: WordsDalService) {}

  async onApplicationBootstrap() {
    this.shuffeledWords = await this.shuffleWords();
  }

  private async shuffleWords() {
    const words = await this.wordsDalService.findAll({
      fromDate: new Date(SHUFFLE_START_DATE),
    });
    return [...words].sort(() => Math.random() - 0.5);
  }

  private async getNextWord(): Promise<Word> {
    if (this.shuffeledWords.length === 0) {
      this.shuffeledWords = await this.shuffleWords();
    }
    const randomWord = this.shuffeledWords.pop();
    return randomWord;
  }

  private async getRandomWord() {
    const words = await this.wordsDalService.findAll({
      fromDate: new Date(SHUFFLE_START_DATE),
    });
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return randomWord;
  }

  async getRandomWordMessage({
    keepOrder = false,
  }: { keepOrder?: boolean } = {}) {
    const randomWord = keepOrder
      ? await this.getNextWord()
      : await this.getRandomWord();
    return this.generateWordMessage(randomWord);
  }

  private escapeString(str?: string) {
    return str?.replace(/[!-\/:-@\[-`{-~]/g, '\\$&');
  }

  private generateWordMessage(word: Word) {
    const { arabic, transliteration, hebrew } = word;
    const [escapedArabic, escapedTransliteration, escapedHebrew] = [
      arabic,
      transliteration,
      hebrew,
    ].map(this.escapeString);
    const message = `*${escapedArabic}*${
      transliteration ? ` \\- ${escapedTransliteration}` : ''
    }

||${escapedHebrew}||`;

    return message;
  }
}
