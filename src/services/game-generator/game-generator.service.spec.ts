import { TestBed } from '@angular/core/testing';

import { GameGeneratorService } from './game-generator.service';

describe('GameGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameGeneratorService = TestBed.get(GameGeneratorService);
    expect(service).toBeTruthy();
  });
});
