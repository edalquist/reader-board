import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDiffComponent } from './board-diff.component';

describe('BoardDiffComponent', () => {
  let component: BoardDiffComponent;
  let fixture: ComponentFixture<BoardDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardDiffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
