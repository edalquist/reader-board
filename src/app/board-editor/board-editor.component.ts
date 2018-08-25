import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LetterDef } from 'src/app/model/letter-def'
import { LetterBox } from 'src/app/model/letter-box'
import { LetterBank } from 'src/app/model/letter-bank'

@Component({
  selector: 'app-board-editor',
  templateUrl: './board-editor.component.html',
  styleUrls: ['./board-editor.component.css'],
})
export class BoardEditorComponent implements OnInit {
  letterBox = new LetterBox();
  letterBank = LetterBank(this.letterBox);
  
  oldSign = new FormControl('');
  newSign = new FormControl('');
  oldCharArray: String[] = [];
  oldChars = {};
  newChars = {};
  // lettersToBring: LetterDiff[] = [];
  // lettersLeftover: LetterDiff[] = [];

  constructor() { }

  ngOnInit() {
    // for (const letter of this.letters) {
    //   for (const char of letter.chars) {
    //     this.letterHash[char] = letter;
    //   }
    // }

    this.oldSign.valueChanges.subscribe(args => {
      args = args.toUpperCase();
      this.oldChars = this.generateCharacterMap(args);
      this.oldCharArray = args.split('');
      this.updateSignDiff();
    });
    this.newSign.valueChanges.subscribe(args => {
      args = args.toUpperCase();
      this.newChars = this.generateCharacterMap(args);
      this.updateSignDiff();
    });
    this.oldSign.setValue('test');
  }

  generateCharacterMap(text: String) {
    const charMap = {};
    for (const char of text.toUpperCase()) {
      if (char == '\n' || char == ' ') continue;
      charMap[char] = (charMap[char] + 1) || 1;
    }
    return charMap;
  }

  updateSignDiff() {
    const charDiff = { ...this.newChars };
    for (const char of Object.keys(this.oldChars)) {
      if (char in this.newChars) {
        charDiff[char] = this.newChars[char] - this.oldChars[char];
      } else {
        charDiff[char] = -1 * this.oldChars[char];
      }
    }

    // this.lettersToBring = [];
    // this.lettersLeftover = []
    for (const char of Object.keys(charDiff).sort()) {
      const count = charDiff[char];
      // if (count > 0) {
      //   this.lettersToBring.push(new LetterDiff(char, count));
      // } else if (count < 0) {
      //   this.lettersLeftover.push(new LetterDiff(char, count));
      // }
    }
  }
}
