import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Board } from '../../interfaces/board';
import { CellPosition } from '../../interfaces/cell.position';
import { Cell } from '../../interfaces/cell';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private state$ = new BehaviorSubject<Board>(null);
  private selectedCellPosition$ = new BehaviorSubject<CellPosition>(null);

  public setState(state: Board): void {
    this.selectedCellPosition$.next(null);
    this.state$.next(state);
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

  public getSelectedCellPosition$(): Observable<CellPosition> {
    return this.selectedCellPosition$.asObservable();
  }
}
