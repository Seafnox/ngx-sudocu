import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { BoardModule } from '../board/board.module';



@NgModule({
    declarations: [GameComponent],
    imports: [
        CommonModule,
        BoardModule,
    ],
    exports: [
        GameComponent,
    ],
})
export class GameModule { }
