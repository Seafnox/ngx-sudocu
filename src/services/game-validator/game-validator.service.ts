import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Board } from '../../interfaces/board';
import { Cell } from '../../interfaces/cell';
import { GameStateService } from '../game-state/game-state.service';

@Injectable({
  providedIn: 'root',
})
export class GameValidatorService {

  constructor(private gameStateService: GameStateService) {}

  validate(): void {
    console.log('validate');
    this.gameStateService.getState$().pipe(take(1)).subscribe(state => this.validateAndUpdate(state));
  }

  private validateAndUpdate(state: Board): void {
    console.log('validateAndUpdate', state);
    const newState = state.map((row, y) => row.map((cell, x) => ({...cell, hasError: this.hasCellError(cell, state, x, y)})));
    this.gameStateService.updateState(newState);
  }

  private hasCellError(cell: Cell, state: Board, x: number, y: number): boolean {
    if (cell.isPermanent) {
      return false;
    }

    if (!cell.userValue) {
      return true;
    }

    if (!this.isCellValueUniqueInRow(cell, state, x, y)) {
      console.log('not isCellValueUniqueInRow', x, y, cell);
      return true;
    }

    if (!this.isCellValueUniqueInCol(cell, state, x, y)) {
      console.log('not isCellValueUniqueInCol', x, y, cell);
      return true;
    }

    return false;
  }

  private isCellValueUniqueInRow(cell: Cell, state: Board, x: number, y: number) {
    const row = state[y];
    const targetValue = cell.userValue;
    return !row.some((target, index) => {
      if (index === x) {
        return false;
      }

      if (target.isPermanent) {
        return target.value === targetValue;
      }

      return target.userValue === targetValue;
    });
  }

  private isCellValueUniqueInCol(cell: Cell, state: Board, x: number, y: number) {
    const targetValue = cell.userValue;
    return !state.some((row, index) => {
      if (index === y) {
        return false;
      }

      const target = row[x];

      if (target.isPermanent) {
        return target.value === targetValue;
      }

      return target.userValue === targetValue;
    });
  }
}
