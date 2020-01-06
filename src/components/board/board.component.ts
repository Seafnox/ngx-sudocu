import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { xSize, ySize } from '../../consts/config';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  @Input() gameStatus: string[][];

  public getCell(x: number, y: number): string {
    return this.gameStatus[x][y];
  }

  public getCells(): number[] {
    return new Array(xSize).fill(0).map((a, index) => index);
  }

  public getRows(): number[] {
    return new Array(ySize).fill(0).map((a, index) => index);
  }
}
