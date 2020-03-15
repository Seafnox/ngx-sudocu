import { Component } from '@angular/core';
import { GameGeneratorService } from '../../services/game-generator/game-generator.service';
import { GameStateService } from '../../services/game-state/game-state.service';
import { Observable } from 'rxjs';
import { Board } from '../../interfaces/board';
import { CellPosition } from '../../interfaces/cell.position';
import { Cell } from '../../interfaces/cell';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  public gameState$: Observable<Board>;
  public isGameWined$: Observable<boolean>;
  public selectedCell$: Observable<Cell>;
  public selectedCellPosition$: Observable<CellPosition>;
  public seed: number;

  constructor(
    private gameGeneratorService: GameGeneratorService,
    private gameStateService: GameStateService,
  ) {
    this.regenerateBoard();
    this.gameState$ = this.gameStateService.getState$();
    this.isGameWined$ = this.gameStateService.getIsWin$();
    this.selectedCell$ = this.gameStateService.getSelectedCellData$();
    this.selectedCellPosition$ = this.gameStateService.getSelectedCellPosition$();
  }

  validate(): void {
    this.gameStateService.validateState();
  }

  public regenerateBoard(): void {
    this.seed = this.gameGeneratorService.generateSeed();
    this.gameStateService.setState(this.gameGeneratorService.generateGame(this.seed, 3));
  }

  public selectCell(position: CellPosition): void {
    this.gameStateService.setSelectedCellPosition(position);
  }

  setCellValue(value: number) {
    this.gameStateService.changeSelectedCellValue(value);
  }
}
