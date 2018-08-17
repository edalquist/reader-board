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