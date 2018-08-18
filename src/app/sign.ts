export class Sign {
    id: number;
    message: string;
}

export class LetterDiff {
    letter: string;
    count: number;
    constructor(letter: string, count: number) {
        this.letter = letter;
        this.count = count;
    }
}

export class Letter {
    chars: string[];
    width: number;
    quantity: number;

    static c(char: string, width: number, quantity: number) {
        return new this([char], width, quantity);
    }
    static cs(chars: string[], width: number, quantity: number) {
        return new this(chars, width, quantity);
    }

    constructor(chars: string[], width: number, quantity: number) {
        this.chars = chars;
        this.width = width;
        this.quantity = quantity;
    }
}