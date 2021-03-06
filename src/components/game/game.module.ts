import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerModule } from '../timer/timer.module';
import { GameComponent } from './game.component';
import { BoardModule } from '../board/board.module';
import { CellActionsModule } from '../cell-actions/cell-actions.module';
import { HappyScreenModule } from '../happy-screen/happy-screen.module';

@NgModule({
  declarations: [GameComponent],
    imports: [
        CommonModule,
        BoardModule,
        CellActionsModule,
        HappyScreenModule,
        TimerModule,
    ],
  exports: [
    GameComponent,
  ],
})
export class GameModule {}
