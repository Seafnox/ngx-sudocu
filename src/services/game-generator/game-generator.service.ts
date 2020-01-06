import { Injectable } from '@angular/core';
import { xSize, ySize } from '../../consts/config';

@Injectable({
  providedIn: 'root'
})
export class GameGeneratorService {
  public generateBoard(): string[][] {
    return new Array(xSize).fill(0).map((a, x) => this.generateRow(x));
  }

  private generateRow(x: number): string[] {
    return new Array(ySize).fill(0).map((a, y) => this.generateCell(x, y));
  }

  private generateCell(x: number, y: number): string {
    return (((x + 1) * (y + 1)) % 10).toString();
  }
}
