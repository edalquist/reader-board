import { Component, OnInit, Input } from '@angular/core';
import { LetterDiff } from '../board';

@Component({
  selector: 'app-board-diff',
  templateUrl: './board-diff.component.html',
  styleUrls: ['./board-diff.component.css']
})
export class BoardDiffComponent implements OnInit {
  @Input() lettersToBring: LetterDiff[];
  @Input() lettersLeftover: LetterDiff[];

  constructor() { }

  ngOnInit(): void {
  }

}
