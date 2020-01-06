import { Component } from '@angular/core';
import { GameGeneratorService } from '../../services/game-generator/game-generator.service';
import { GameStateService } from '../../services/game-state/game-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  public gameState$: Observable<string[][]>;

  constructor(
    private gameGeneratorService: GameGeneratorService,
    private gameStateService: GameStateService,
  ) {
    this.gameStateService.setState(this.gameGeneratorService.generateBoard());
    this.gameState$ = this.gameStateService.getState$();
  }
}
