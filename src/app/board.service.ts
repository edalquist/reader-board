import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { Board } from 'src/app/board';
import { BOARD } from 'src/app/mock-board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor() {
    BOARD.content = "TEST CONTENT";
  }

  getBoard() {
    return BOARD;
  }
}
