import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HappyScreenComponent } from './happy-screen.component';

@NgModule({
  declarations: [HappyScreenComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    HappyScreenComponent,
  ],
})
export class HappyScreenModule {
}
