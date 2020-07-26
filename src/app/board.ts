/**
 * test
 */
export class LetterDiff {
  letter: string;
  count: number;

  constructor(letter: string, count: number) {
      this.letter = letter;
      this.count = count;
  }
}

/**
 * Defines a Board that can be updated/edited. Has a set of available letters.
 */
export class Board {
  readonly id: number;
  readonly name: string;
  readonly inventory: Map<string, LetterDef>;
  content: string;

  constructor(id: number, name: string, inventory: LetterDef[]) {
    this.id = id;
    this.name = name;

    this.inventory = new Map();
    for (const letter of inventory) {
      letter.chars.forEach(char => {
        this.inventory.set(char, letter);
      });
    }
  }
}

/**
 * Defines an immutable "Letter" for the board. Some functional letter cards are actually multiple logical letters
 * like 1 and I or 0 and O.
 */
export class LetterDef {
  readonly chars: Set<string>;
  readonly width: number;
  readonly quantity: number;

  static c(char: string, width: number, quantity: number) {
      return new this([char], width, quantity);
  }
  static cs(chars: string[], width: number, quantity: number) {
      return new this(chars, width, quantity);
  }

  constructor(chars: string[], width: number, quantity: number) {
      this.chars = new Set(chars);
      this.width = width;
      this.quantity = quantity;
  }
}