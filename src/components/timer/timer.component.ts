import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { GameStateService } from '../../services/game-state/game-state.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  public timer$: Observable<string>;
  public SECOND = 1000;
  public SECONDS_IN_MINUTE = 60;
  public MINUTE = this.SECOND * this.SECONDS_IN_MINUTE;
  public MINUTES_IN_HOUR = 60;
  public HOUR = this.MINUTE * this.MINUTES_IN_HOUR;

  constructor(
    private readonly gameStateService: GameStateService,
  ) {}

  ngOnInit() {
    this.timer$ = this.gameStateService.getInitTime$().pipe(
      switchMap(initialTime => interval(1000).pipe(mapTo(initialTime))),
      map(initialTime => Date.now() - initialTime),
      map(timing => this.mapTiming(timing)),
    );
  }

  private mapTiming(timing: number): string {
    const hours: number[] = this.hasHours(timing) ? [this.getHours(timing)] : [];
    const values: number[] = [
      ...hours,
      this.getMinutes(timing),
      this.getSeconds(timing),
    ];

    return values.map(value => value.toString().padStart(2, '0')).join(':');
  }

  private hasHours(timing: number): boolean {
    return timing >= this.HOUR;
  }

  private getHours(timing: number): number {
    return (timing - timing % this.HOUR) / this.HOUR;
  }

  private getAllHours(timing: number): number {
    return (timing - timing % this.HOUR) / this.HOUR;
  }

  private getMinutes(timing: number): number {
    return ((timing - timing % this.MINUTE) / this.MINUTE) - this.getAllHours(timing) * this.MINUTES_IN_HOUR;
  }

  private getAllMinutes(timing: number): number {
    return (timing - timing % this.MINUTE) / this.MINUTE;
  }

  private getSeconds(timing: number): number {
    return (timing - timing % this.SECOND) / this.SECOND - this.getAllMinutes(timing) * this.SECONDS_IN_MINUTE;
  }
}
