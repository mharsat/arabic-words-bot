const { JSDOM } = require('jsdom');
const fs = require('fs');

const words = [];

const getWords = async (words) => {
  const results = await Promise.all(
    words.map(async (word) => {
      try {
        const response = await fetch(
          `https://milon.madrasafree.com/?searchString=${word}`,
        );
        const text = await response.text();
        const dom = new JSDOM();
        const parser = new dom.window.DOMParser();
        const document = parser.parseFromString(text, 'text/html');
        const firstResult = [...document.getElementsByClassName('result')][0];
        const [hebrew, arabic, transliteration] = [...firstResult.children].map(
          (child) => child.textContent.trim(),
        );
        return {
          arabic,
          hebrew,
          transliteration,
        };
      } catch (error) {
        console.log(`error getting the word ${word}`, error);
        return {
          arabic: '',
          hebrew: '',
          transliteration: '',
        };
      }
    }),
  );
  fs.writeFileSync(`./words.json`, JSON.stringify(results, null, 2));
};

getWords(words);
