import { Injectable } from '@angular/core';
import { Board } from '../../interfaces/board';
import { Cell } from '../../interfaces/cell';

@Injectable({
  providedIn: 'root',
})
export class GameValidatorService {
  validate(state: Board): Board {
    return this.validateAndUpdate(state);
  }

  preValidate(state: Board): Board {
    return this.preValidateAndUpdate(state);
  }

  private validateAndUpdate(state: Board): Board {
    return state.map((row, y) => row.map((cell, x) => ({...cell, hasError: this.hasValidationError(cell, state, x, y)})));
  }

  private preValidateAndUpdate(state: Board): Board {
    return state.map((row, y) => row.map((cell, x) => ({...cell, hasError: this.hasPreValidationError(cell, state, x, y)})));
  }

  private hasValidationError(cell: Cell, state: Board, x: number, y: number): boolean {
    if (cell.isPermanent) {
      return false;
    }

    if (!cell.userValue) {
      return true;
    }

    return !(this.isCellValueUniqueInRow(cell, state, x, y) && this.isCellValueUniqueInCol(cell, state, x, y));
  }

  private hasPreValidationError(cell: Cell, state: Board, x: number, y: number): boolean {
    if (cell.isPermanent || !cell.userValue) {
      return false;
    }

    return !(this.isCellValueUniqueInRow(cell, state, x, y) && this.isCellValueUniqueInCol(cell, state, x, y));
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
