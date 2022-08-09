/*
  kropka <= 1s
  kreska - 3x kropka (1s * 3)
  odstęp między elementami znaku - 1x kropka
  odstęp między znakami - 3x kropka
  odstęp między słowami - 7x kropka
*/

export const WORD_SPLITTER = '_______';
const CHARACTER_SPLITTER = '___';
const dotTimer = 1000; //kropka to 1s

const encodeCharacter = (code: string): string => {
    if (code === '.-') return 'A';
    if (code === '-...') return 'B';
    if (code === '-.-.') return 'C';
    if (code === '-..') return 'D';
    if (code === '.') return 'E';
    if (code === '..-.') return 'F';
    if (code === '--.') return 'G';
    if (code === '....') return 'H';
    if (code === '..') return 'I';
    if (code === '.---') return 'J';
    if (code === '-.-') return 'K';
    if (code === '.-..') return 'L';
    if (code === '--') return 'M';
    if (code === '-.') return 'N';
    if (code === '---') return 'O';
    if (code === '.--.') return 'P';
    if (code === '--.-') return 'Q';
    if (code === '.-.') return 'R';
    if (code === '...') return 'S';
    if (code === '-') return 'T';
    if (code === '..-') return 'U';
    if (code === '...-') return 'V';
    if (code === '.--') return 'W';
    if (code === '-..-') return 'X';
    if (code === '-.--') return 'Y';
    if (code === '--..') return 'Z';
    if (code === '.-.-') return 'Ą';
    if (code === '-.-..') return 'Ć';
    if (code === '..-..') return 'Ę';
    if (code === '----') return 'CH';
    if (code === '.-..-') return 'Ł';
    if (code === '--.--') return 'Ń';
    if (code === '---.') return 'Ó';
    if (code === '...-...') return 'Ś';
    if (code === '--..-.') return 'Ż';
    if (code === '--..-') return 'Ź';
    if (code === '.----') return '1';
    if (code === '..---') return '2';
    if (code === '...--') return '3';
    if (code === '....-') return '4';
    if (code === '.....') return '5';
    if (code === '-....') return '6';
    if (code === '--...') return '7';
    if (code === '---..') return '8';
    if (code === '----.') return '9';
    if (code === '-----') return '0';
    return '';
}

const encodeWord = (word: string): string => {
    const splittedWord = word.split(CHARACTER_SPLITTER);

    return splittedWord.reduce((accumulator, code) => accumulator += encodeCharacter(code), '') + ' ';
}

export const encodeString = (str: string): string => {
    const arr = str.split(WORD_SPLITTER);

    return arr.reduce((accumulator, currentValue) => accumulator += encodeWord(currentValue), '')
}

const msToS = (ms: number): number => ms / dotTimer;

export const getSymbol = (timeElapsed: number, isPressed: boolean): string => {
    const secondsElapsed = msToS(timeElapsed);

    if (!isPressed) {
        if (Math.ceil(secondsElapsed) <= 1) return '.';
        return '-';
    }

    if (Math.ceil(secondsElapsed) <= 1) return '';
    if (Math.ceil(secondsElapsed) <= 3) return CHARACTER_SPLITTER;
    return WORD_SPLITTER;
}