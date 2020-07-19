import { Map } from 'immutable'
import { LetterDef } from 'src/app/model/letter-def'

/**
 * Defines the immutable collection of letters
 */
export class LetterBox {
    readonly inventory: Map<string, LetterDef>;
    // TODO is there a way to clone this in TS?
    private available: {[key: string]: number} = {};

    constructor() {
        const accumulator: {[key: string]: LetterDef} = {};
        for (const letter of LETTERS) {
            letter.chars.forEach(char => {
                accumulator[char] = letter;
                this.available[char] = letter.quantity;
            });
        }
        this.inventory = Map(accumulator);
    }
    
    getSignState(oldText: string, newText: string): LetterState {
        // Always upper case inputs
        oldText = oldText.toUpperCase();
        newText = newText.toUpperCase();

        // Create remaining map that new letters will get subtracted fun
        const remaining: {[key: string]: number} = {};
        this.inventory.forEach(letterDef => {
            letterDef.chars.forEach(char => {
                remaining[char] = letterDef.quantity;
            });
        });

        // Create char > number mapping of old text data
        const charsToReturn = this.generateCharacterMap(oldText);
        const charsToBring: {[key: string]: number} = {};

        // Iterate through new text, deducting from remaining and oldChars
        for (const char of newText) {
            if (char == '\n' || char == ' ') {
                continue;
            }
            // Count against the remaining
            if (remaining[char] != undefined) {
                remaining[char] = remaining[char] - 1;
            } else {
                remaining[char] = -1;
            }
            // Track letters to bring and what will come back
            if (charsToReturn[char] > 0) {
                charsToReturn[char] = charsToReturn[char] - 1;
            } else {
                charsToBring[char] = charsToBring[char] + 1;
            }
        }

        return new LetterState(remaining, charsToBring, charsToReturn);
    }

    private generateCharacterMap(text: String) {
      const charMap: {[key: string]: number} = {};
      for (const char of text.toUpperCase()) {
        if (char == '\n' || char == ' ') {
            continue;
        }
        if (charMap[char] != undefined) {
            charMap[char] = charMap[char] + 1;
        } else {
            charMap[char] = 1;
        }
      }
      return charMap;
    }
}

/**
 * Sign state based on current inventory/old/new
 */
export class LetterState {
    readonly remaining: Map<string, number>;
    readonly charsToBring: Map<string, number>;
    readonly charsToReturn: Map<string, number>;

    constructor(remaining: {[key: string]: number}, charsToBring: {[key: string]: number}, charsToReturn: {[key: string]: number}) {
        this.remaining = Map(remaining);
        this.charsToBring = Map(charsToBring);
        this.charsToReturn = Map(charsToReturn);
    }
}


/**
 * Dictionary of all the letter cards, their width in mm, and the number of them.
 */
const LETTERS: LetterDef[] = [
    LetterDef.c('A', 125, 18),
    LetterDef.c('B', 128, 8),
    LetterDef.c('C', 119, 8),
    LetterDef.c('D', 126, 8),
    LetterDef.c('E', 106, 19),
    LetterDef.c('F', 106, 8),
    LetterDef.c('G', 125, 8),
    LetterDef.c('H', 125, 8),
    LetterDef.cs(['I', '1'], 69, 23),
    LetterDef.c('J', 102, 4),
    LetterDef.c('K', 127, 4),
    LetterDef.c('L', 111, 10),
    LetterDef.c('M', 152, 10),
    LetterDef.c('N', 121, 10),
    LetterDef.cs(['O', '0'], 122, 18),
    LetterDef.c('P', 121, 10),
    LetterDef.c('Q', 136, 4),
    LetterDef.c('R', 127, 10),
    LetterDef.c('S', 112, 10),
    LetterDef.c('T', 114, 10),
    LetterDef.c('U', 127, 14),
    LetterDef.c('V', 123, 4),
    LetterDef.c('W', 155, 4),
    LetterDef.c('X', 131, 4),
    LetterDef.c('Y', 137, 4),
    LetterDef.c('Z', 112, 4),
    LetterDef.c('2', 102, 4),
    LetterDef.c('3', 102, 4), // TODO measure 3!
    LetterDef.c('4', 115, 4),
    LetterDef.c('5', 106, 4),
    LetterDef.cs(['6', '9'], 121, 8),
    LetterDef.c('7', 105, 4),
    LetterDef.c('8', 115, 4),
    LetterDef.c('&', 121, 4),
    LetterDef.c('\\', 113, 4),
    LetterDef.c('"', 104, 8),
    LetterDef.c('\'', 58, 4),
    LetterDef.c(',', 60, 3),
    LetterDef.c('.', 60, 4),
    LetterDef.c(':', 61, 5),
    LetterDef.c('!', 59, 4),
    LetterDef.c('?', 86, 4),
    LetterDef.c('=', 83, 2),
    LetterDef.c('-', 75, 4),
    LetterDef.c('$', 85, 2),
    LetterDef.c('¢', 70, 2),
    LetterDef.c('#', 96, 4),
    LetterDef.c('@', 87, 4)
  ];
  