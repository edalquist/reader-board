import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LetterDiff } from '../sign';

@Component({
  selector: 'app-board-editor',
  templateUrl: './board-editor.component.html',
  styleUrls: ['./board-editor.component.css'],
})
export class BoardEditorComponent implements OnInit {
  oldSign = new FormControl('');
  newSign = new FormControl('');
  oldChars = {};
  newChars = {};
  lettersToBring: LetterDiff[];
  lettersLeftover: LetterDiff[];

  constructor() { }

  ngOnInit() {
    this.oldSign.valueChanges.subscribe(args => {
      this.oldChars = this.generateCharacterMap(args);
      this.updateSignDiff();
    });
    this.newSign.valueChanges.subscribe(args => {
      this.newChars = this.generateCharacterMap(args);
      this.updateSignDiff();
    });
  }

  generateCharacterMap(text: String) {
    const charMap = {};
    for (const char of text.toUpperCase()) {
      if (char == '\n') continue;
      charMap[char] = (charMap[char] + 1) || 1;
    }
    return charMap;
  }

  updateSignDiff() {
    const charDiff = {...this.newChars};
    for (const char of Object.keys(this.oldChars)) {
      if (char in this.newChars) {
        charDiff[char] = this.newChars[char] - this.oldChars[char];
      } else {
        charDiff[char] = -1 * this.oldChars[char];
      }
    }

    this.lettersToBring = [];
    this.lettersLeftover = []
    for (const char of Object.keys(charDiff).sort()) {
      const count = charDiff[char];
      if (count > 0) {
        this.lettersToBring.push(new LetterDiff(char, count));
      } else if (count < 0) {
        this.lettersLeftover.push(new LetterDiff(char, count));
    }
  }
}
