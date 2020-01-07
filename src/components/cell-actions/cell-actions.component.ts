import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../../interfaces/board';
import { CellPosition } from '../../interfaces/cell.position';
import { Cell } from '../../interfaces/cell';
import { boardSize } from '../../consts/config';

@Component({
  selector: 'app-cell-actions',
  templateUrl: './cell-actions.component.html',
  styleUrls: ['./cell-actions.component.css']
})
export class CellActionsComponent {
  @Input() position: CellPosition;
  @Input() cell: Cell;
  @Input() board: Board;

  @Output() positionChange = new EventEmitter<CellPosition>();
  @Output() cellValueChange = new EventEmitter<number>();

  public values = new Array(boardSize).fill(0).map((a, index) => index + 1);

  public moveLeft(): void {
    if (!this.position) {return this.positionChange.emit({x: 0, y: 0});}
    return this.positionChange.emit({...this.position, x: (this.position.x - 1 + boardSize) % boardSize});
  }

  public moveRight(): void {
    if (!this.position) {return this.positionChange.emit({x: 0, y: 0});}
    return this.positionChange.emit({...this.position, x: (this.position.x + 1) % boardSize});
  }

  public moveUp(): void {
    if (!this.position) {return this.positionChange.emit({x: 0, y: 0});}
    return this.positionChange.emit({...this.position, y: (this.position.y - 1 + boardSize) % boardSize});
  }

  public moveDown(): void {
    if (!this.position) {return this.positionChange.emit({x: 0, y: 0});}
    return this.positionChange.emit({...this.position, y: (this.position.y + 1 + boardSize) % boardSize});
  }

  public select(value: number): void {
    if (this.canSelect(value)) {
      this.cellValueChange.emit(value);
    }
  }

  private canSelect(value: number): boolean {
    return true;
  }
}
