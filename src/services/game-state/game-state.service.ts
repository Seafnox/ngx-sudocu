import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private state$ = new BehaviorSubject<string[][]>(null);

  public setState(state: string[][]): void {
    this.state$.next(state);
  }

  public getState$(): Observable<string[][]> {
    return this.state$.asObservable();
  }
}
