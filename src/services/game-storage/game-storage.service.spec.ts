import { TestBed } from '@angular/core/testing';

import { GameStorageService } from './game-storage.service';

describe('GameStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameStorageService = TestBed.get(GameStorageService);
    expect(service).toBeTruthy();
  });
});
