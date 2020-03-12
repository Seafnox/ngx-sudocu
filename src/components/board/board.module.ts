import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { CellModule } from '../cell/cell.module';
import { SectorModule } from '../sector/sector.module';



@NgModule({
  declarations: [BoardComponent],
    imports: [
        CommonModule,
        CellModule,
        SectorModule,
    ],
  exports: [
    BoardComponent,
  ],
})
export class BoardModule { }
