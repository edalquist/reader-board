import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {BoardService} from 'src/app/board.service';
import {Board, LetterDiff} from 'src/app/board';

@Component({
  selector: 'app-update-board',
  templateUrl: './update-board.component.html',
  styleUrls: ['./update-board.component.css'],
  providers: [BoardService],
})
export class UpdateBoardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  layout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {cols: 1, rows: 2 };
      }

      return {cols: 2, rows: 2 };
    })
  );
  board: Board;
  oldContent: string;
  newContent: string;
  oldChars = {};
  newChars = {};
  lettersToBring: LetterDiff[];
  lettersLeftover: LetterDiff[];

  constructor(private breakpointObserver: BreakpointObserver, private boardService: BoardService) {
  }

  ngOnInit(): void {
    this.board = this.boardService.getBoard();
  }

  setOldContent(oldContent: string) {
    this.oldContent = oldContent;
    this.oldChars = this.generateCharacterMap(oldContent);
    this.updateSignDiff();
  }

  setNewContent(newContent: string) {
    this.newContent = newContent;
    this.newChars = this.generateCharacterMap(newContent);
    this.updateSignDiff();
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
      if (charDiff[char] == 0) {
        delete charDiff[char];
      }
    }
    console.log(charDiff);

    this.lettersToBring = [];
    this.lettersLeftover = []
    for (const char of Object.keys(charDiff).sort()) {
      const count = charDiff[char];
      if (count > 0) {
        this.lettersToBring.push(new LetterDiff(char, count));
      } else if (count < 0) {
        this.lettersLeftover.push(new LetterDiff(char, count * -1));
      }
    }
  }
}
