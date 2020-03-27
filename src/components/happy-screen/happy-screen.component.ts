import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-happy-screen',
  template: '<ng-content></ng-content><div *ngIf="isWinner" class="locker">You are winner!</div>',
  styleUrls: ['./happy-screen.component.css']
})
export class HappyScreenComponent {
  @Input() isWinner: boolean;
}
