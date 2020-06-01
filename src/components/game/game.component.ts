import { Component, OnInit } from '@angular/core';
import { GameGeneratorService } from '../../services/game-generator/game-generator.service';
import { GameStateService } from '../../services/game-state/game-state.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board } from '../../interfaces/board';
import { CellPosition } from '../../interfaces/cell.position';
import { Cell } from '../../interfaces/cell';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, switchMapTo, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  // TODO add Local storage + state by seed
  // TODO add time score
  public gameState$: Observable<Board>;
  public isGameWined$: Observable<boolean>;
  public selectedCell$: Observable<Cell>;
  public selectedCellPosition$: Observable<CellPosition>;
  public seed$ = new BehaviorSubject<number>(undefined);

  private seedQueryName = 'seed';

  constructor(
    private gameGeneratorService: GameGeneratorService,
    private gameStateService: GameStateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        switchMapTo(this.activatedRoute.queryParams),
        tap(console.log.bind(null, '[WIP] queryParams')),
        take(1),
      )
      .subscribe(params => {
        const seed: string = params[this.seedQueryName];

        seed ? this.initBoard(+seed) : this.regenerateBoard();
      });

    this.gameState$ = this.gameStateService.getState$();
    this.isGameWined$ = this.gameStateService.getIsWin$();
    this.selectedCell$ = this.gameStateService.getSelectedCellData$();
    this.selectedCellPosition$ = this.gameStateService.getSelectedCellPosition$();
  }

  validate(): void {
    this.gameStateService.validateState();
  }

  public regenerateBoard(): void {
    this.seed$.next(this.gameGeneratorService.generateSeed());
    this.gameStateService.setState(this.gameGeneratorService.generateGame(this.seed$.value, 3));
    this.router.navigate([], { queryParams: { [this.seedQueryName]: this.seed$.value} });
  }

  public initBoard(seed: number): void {
    this.seed$.next(seed);
    this.gameStateService.setState(this.gameGeneratorService.generateGame(this.seed$.value, 3));
  }

  public selectCell(position: CellPosition): void {
    this.gameStateService.setSelectedCellPosition(position);
  }

  setCellValue(value: number) {
    this.gameStateService.changeSelectedCellValue(value);
  }
}
