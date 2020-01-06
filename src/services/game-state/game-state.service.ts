import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '../../interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private state$ = new BehaviorSubject<Board>(null);

  public setState(state: Board): void {
    this.state$.next(state);
  }

  public getState$(): Observable<Board> {
    return this.state$.asObservable();
  }
}
