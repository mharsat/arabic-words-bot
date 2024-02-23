import { Injectable } from '@nestjs/common';
import words from './words.json';
import { Word } from './words.types';

const NEW_WORDS_CUTOFF = 60;

@Injectable()
export class WordsService {
  // shuffeled words help us avoid repeating words for ordered use cases
  private shuffeledWords: Word[];

  constructor() {
    this.shuffeledWords = this.shuffleWords();
  }

  shuffleWords() {
    return [...words].slice(NEW_WORDS_CUTOFF).sort(() => Math.random() - 0.5);
  }

  getNextWord(): Word {
    if (this.shuffeledWords.length === 0) {
      this.shuffeledWords = this.shuffleWords();
    }
    const randomWord = this.shuffeledWords.pop();
    return randomWord;
  }

  getRandomWord() {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return randomWord;
  }

  getRandomWordMessage({ keepOrder = false }: { keepOrder?: boolean } = {}) {
    const randomWord = keepOrder ? this.getNextWord() : this.getRandomWord();
    return this.generateWordMessage(randomWord);
  }

  escapeString(str?: string) {
    return str?.replace(/[!-\/:-@\[-`{-~]/g, '\\$&');
  }

  generateWordMessage(word: Word) {
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
