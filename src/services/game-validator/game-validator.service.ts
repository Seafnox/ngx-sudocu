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
    const newState = state.map(row => row.map(cell => ({...cell, hasError: this.hasCellError(cell, state)})));
    this.gameStateService.updateState(newState);
  }

  private hasCellError(cell: Cell, state: Board): boolean {
    return !cell.isPermanent;
  }
}
