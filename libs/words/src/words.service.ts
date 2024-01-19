import { Injectable } from '@nestjs/common';
import words from './words.json';
import { Word } from './words.types';

@Injectable()
export class WordsService {
  getRandomWordMessage() {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return this.generateWordMessage(randomWord);
  }

  generateWordMessage(word: Word) {
    const message = `*${word.arabic}* \\- ${word.transliteration}

||${word.hebrew}||`;

    return message;
  }
}
