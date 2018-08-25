import { Set } from 'immutable'

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
        this.chars = Set(chars);
        this.width = width;
        this.quantity = quantity;
    }
}
