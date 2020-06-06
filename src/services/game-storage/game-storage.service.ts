import { Injectable } from '@angular/core';
import { StorageBoard } from '../../interfaces/storage-board';

@Injectable({
  providedIn: 'root'
})
export class GameStorageService {
  public lastSeedKey = 'lastSeed';
  public lastStateKey = 'lastState';
  public lastInitTimeKey = 'lastInitTime';

  setLastSeed(value: number): void {
    window.localStorage.setItem(this.lastSeedKey, `${value}`);
  }

  getLastSeed(): number {
    return +window.localStorage.getItem(this.lastSeedKey);
  }

  setLastState(state: StorageBoard): void {
    window.localStorage.setItem(this.lastStateKey, JSON.stringify(state));
  }

  getLastState(): StorageBoard {
    return JSON.parse(window.localStorage.getItem(this.lastStateKey));
  }

  getInitTime(): number {
    return +window.localStorage.getItem(this.lastInitTimeKey);
  }

  setInitTime(value: number): void {
    window.localStorage.setItem(this.lastInitTimeKey, `${value}`);
  }

  refresh(): void {
    window.localStorage.removeItem(this.lastSeedKey);
    window.localStorage.removeItem(this.lastStateKey);
  }
}
