import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../../interfaces/board';
import { CellPosition } from '../../interfaces/cell.position';
import { Cell } from '../../interfaces/cell';
import { areaSize, boardSize } from '../../consts/config';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent {
  @Input() gameStatus: Board;
  @Input() positionX: number;
  @Input() positionY: number;
  @Input() selectedPosition: CellPosition;
  @Input() alwaysShown: boolean;

  @Output() selected = new EventEmitter<CellPosition>();

  public getCell(x: number, y: number): Cell {
    return this.gameStatus[y][x];
  }

  public getCells(): number[] {
    return new Array(areaSize).fill(0).map((a, index) => index + this.positionX * areaSize);
  }

  public getRows(): number[] {
    return new Array(areaSize).fill(0).map((a, index) => index + this.positionY * areaSize);
  }

  public selectCell(x: number, y: number): void {
    this.selected.emit({x, y});
  }

  public isCellSelected(x: number, y: number): boolean {
    return this.selectedPosition && this.selectedPosition.x === x && this.selectedPosition.y === y;
  }

}
