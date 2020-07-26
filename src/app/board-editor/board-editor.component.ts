import { Component, OnInit, Input, Output, EventEmitter, NgZone, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {BoardService} from 'src/app/board.service';
import {Board} from 'src/app/board';
import { TilePosition } from '@angular/material/grid-list/tile-coordinator';


@Component({
  selector: 'app-board-editor',
  templateUrl: './board-editor.component.html',
  styleUrls: ['./board-editor.component.css'],
})
export class BoardEditorComponent implements OnInit {
  @Input() title: string;
  @Input() initValue: string;

  @Output() boardValue: EventEmitter<string> = new EventEmitter();

  currentValue: string;
  
  constructor(private _ngZone: NgZone) {}

  ngOnInit(): void {
    this.sendBoard(this.initValue);
  }

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  sendBoard(board: string) {
    if (!board) {
      board = "";
    }
    board = board.toUpperCase();
    this.currentValue = board;
    this.boardValue.emit(board);
  }
}
