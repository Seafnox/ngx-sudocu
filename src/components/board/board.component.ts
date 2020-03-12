import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { areaCount, boardSize } from '../../consts/config';
import { Board } from '../../interfaces/board';
import { Cell } from '../../interfaces/cell';
import { CellPosition } from '../../interfaces/cell.position';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  @Input() gameStatus: Board;
  @Input() selectedPosition: CellPosition;
  @Input() alwaysShown: boolean;

  @Output() selected = new EventEmitter<CellPosition>();

  public getCell(x: number, y: number): Cell {
    return this.gameStatus[y][x];
  }

  public getCells(): number[] {
    return new Array(boardSize).fill(0).map((a, index) => index);
  }

  public getColSectors(): number[] {
    return new Array(areaCount).fill(0).map((a, index) => index);
  }

  public getRowSectors(): number[] {
    return new Array(areaCount).fill(0).map((a, index) => index);
  }

  public getRows(): number[] {
    return new Array(boardSize).fill(0).map((a, index) => index);
  }

  public selectCell(event: CellPosition): void {
    this.selected.emit(event);
  }

  public isCellSelected(x: number, y: number): boolean {
    return this.selectedPosition && this.selectedPosition.x === x && this.selectedPosition.y === y;
  }
}
