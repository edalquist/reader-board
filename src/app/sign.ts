import { Set, Map } from 'immutable'
// import {} from

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
    readonly chars: Set<string>;
    quantity: number;
}