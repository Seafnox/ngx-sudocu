import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellActionsComponent } from './cell-actions.component';

@NgModule({
  declarations: [CellActionsComponent],
  exports: [
    CellActionsComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class CellActionsModule {}
