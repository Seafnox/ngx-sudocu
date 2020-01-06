import { Component } from '@angular/core';
import { GameGeneratorService } from '../../services/game-generator/game-generator.service';
import { GameStateService } from '../../services/game-state/game-state.service';
import { Observable } from 'rxjs';
import { Board } from '../../interfaces/board';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  public gameState$: Observable<Board>;
  public seed: number;

  constructor(
    private gameGeneratorService: GameGeneratorService,
    private gameStateService: GameStateService,
  ) {
    this.regenerateBoard();
    this.gameState$ = this.gameStateService.getState$();
  }

  public regenerateBoard(): void {
    this.seed = this.gameGeneratorService.generateSeed();
    this.gameStateService.setState(this.gameGeneratorService.generateBoard(this.seed));
  }

  public getLastOperations(): string[] {
    return this.gameGeneratorService.lastOperations;
  }
}
