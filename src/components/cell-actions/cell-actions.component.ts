import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Board } from '../../interfaces/board';
import { CellPosition } from '../../interfaces/cell.position';
import { Cell } from '../../interfaces/cell';
import { boardSize } from '../../consts/config';

@Component({
  selector: 'app-cell-actions',
  templateUrl: './cell-actions.component.html',
  styleUrls: ['./cell-actions.component.css'],
})
export class CellActionsComponent {
  @Input() position: CellPosition;
  @Input() cell: Cell;
  @Input() board: Board;
  @Input() stopChanges: boolean;

  @Output() positionChange = new EventEmitter<CellPosition>();
  @Output() cellValueChange = new EventEmitter<number>();

  public values = new Array(boardSize).fill(0).map((a, index) => index + 1);

  public moveLeft(): void {
    if (!this.position) {
      return this.positionChange.emit({x: 0, y: 0});
    }
    return this.positionChange.emit({...this.position, x: (this.position.x - 1 + boardSize) % boardSize});
  }

  public moveRight(): void {
    if (!this.position) {
      return this.positionChange.emit({x: 0, y: 0});
    }
    return this.positionChange.emit({...this.position, x: (this.position.x + 1) % boardSize});
  }

  public moveUp(): void {
    if (!this.position) {
      return this.positionChange.emit({x: 0, y: 0});
    }
    return this.positionChange.emit({...this.position, y: (this.position.y - 1 + boardSize) % boardSize});
  }

  public moveDown(): void {
    if (!this.position) {
      return this.positionChange.emit({x: 0, y: 0});
    }
    return this.positionChange.emit({...this.position, y: (this.position.y + 1 + boardSize) % boardSize});
  }

  public select(value: number): void {
    if (this.canSelect(value)) {
      this.cellValueChange.emit(value);
    }
  }

  @HostListener('window:keydown', ['$event'])
  private handleKeyDown(event: KeyboardEvent): void {
    if (this.stopChanges) { return; }

    switch (event.key) {
      case 'ArrowUp': return this.moveUp();
      case 'ArrowDown': return this.moveDown();
      case 'ArrowLeft': return this.moveLeft();
      case 'ArrowRight': return this.moveRight();
      case '1': return this.select(1);
      case '2': return this.select(2);
      case '3': return this.select(3);
      case '4': return this.select(4);
      case '5': return this.select(5);
      case '6': return this.select(6);
      case '7': return this.select(7);
      case '8': return this.select(8);
      case '9': return this.select(9);
    }
  }

  private canSelect(value: number): boolean {
    return !this.stopChanges && !!this.cell && !this.cell.isPermanent && this.cell.userValue !== value;
  }
}
