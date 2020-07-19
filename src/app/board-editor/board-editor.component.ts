import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LetterDef } from 'src/app/model/letter-def'
import { LetterBox, LetterState } from 'src/app/model/letter-box'

@Component({
  selector: 'app-board-editor',
  templateUrl: './board-editor.component.html',
  styleUrls: ['./board-editor.component.css'],
})
export class BoardEditorComponent implements OnInit {
  letterBox = new LetterBox();
  letterState: LetterState;

  oldSign = new FormControl('');
  newSign = new FormControl('');

  constructor() { }

  ngOnInit() {
    this.updateSignDiff();
    this.oldSign.valueChanges.subscribe(this.updateSignDiff);
    this.newSign.valueChanges.subscribe(this.updateSignDiff);

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
    this.letterState = this.letterBox.getSignState(this.oldSign.value, this.newSign.value);
  }
}
