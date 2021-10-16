import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Row } from '../../interfaces/board';
import { Cell } from '../../interfaces/cell';
import { BoardComponent } from './board.component';
import { BoardModule } from './board.module';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ BoardModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    component.gameStatus = Array(10).fill(null).map((): Row =>
      Array(10).fill(null).map((): Cell => ({
        isPermanent: false,
        hasError: false,
        value: 0,
      })));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
