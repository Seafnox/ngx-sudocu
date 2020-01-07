import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { BoardModule } from '../board/board.module';
import { CellActionsModule } from '../cell-actions/cell-actions.module';

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    BoardModule,
    CellActionsModule,
  ],
  exports: [
    GameComponent,
  ],
})
export class GameModule {}
