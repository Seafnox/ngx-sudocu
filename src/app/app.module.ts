import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GameModule } from '../components/game/game.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        GameModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
