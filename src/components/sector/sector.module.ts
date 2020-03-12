import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectorComponent } from './sector.component';
import { CellModule } from '../cell/cell.module';



@NgModule({
    declarations: [SectorComponent],
    exports: [
        SectorComponent,
    ],
    imports: [
        CommonModule,
        CellModule,
    ],
})
export class SectorModule { }
