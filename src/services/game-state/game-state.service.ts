import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Board } from '../../interfaces/board';
import { CellPosition } from '../../interfaces/cell.position';
import { Cell } from '../../interfaces/cell';
import { map, switchMap } from 'rxjs/operators';
import { GameValidatorService } from '../game-validator/game-validator.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private state$ = new BehaviorSubject<Board>(null);
  private selectedCellPosition$ = new BehaviorSubject<CellPosition>(null);
  private isWin$ = new BehaviorSubject<boolean>(false);

  constructor(private gameValidatorService: GameValidatorService) {}

  public setState(state: Board): void {
    this.selectedCellPosition$.next(null);
    this.isWin$.next(false);
    this.state$.next(state);
  }

  public validateState(): void {
    const newState = this.gameValidatorService.validate(this.state$.value);
    this.state$.next(newState);
  }

  public setSelectedCellPosition(position: CellPosition): void {
    this.selectedCellPosition$.next(position);
  }

  public getSelectedCellData$(): Observable<Cell> {
    return this.selectedCellPosition$.pipe(
      switchMap(position => {
        return position ? this.state$.pipe(map(state => state ? state[position.y][position.x] : null)) : of(null);
      })
    );
  }

  public getState$(): Observable<Board> {
    return this.state$.asObservable();
  }

  public getIsWin$(): Observable<boolean> {
    return this.isWin$.asObservable();
  }

  public getSelectedCellPosition$(): Observable<CellPosition> {
    return this.selectedCellPosition$.asObservable();
  }

  public changeSelectedCellValue(value: number) {
    if (this.isWin$.value) {
      return;
    }

    const position = this.selectedCellPosition$.value;
    const newState = this.state$.value.map((row, y) =>
      y !== position.y ? row : row.map((cell, x) =>
        x !== position.x ? cell : {...cell, userValue: value, hasError: false}));

    const validatedState = this.preValidateState(newState);
    this.state$.next(validatedState);
  }

  private preValidateState(state: Board): Board {
    const isFullFilled = state.some(row => row.some(cell => !cell.userValue));

    if (isFullFilled) {
      const validatedState = this.gameValidatorService.validate(state);
      const hasError = validatedState.some(row => row.some(cell => cell.hasError));

      if (!hasError) {
        this.isWin$.next(true);
      }

      return validatedState;
    }
    return this.gameValidatorService.preValidate(state);
  }
}
