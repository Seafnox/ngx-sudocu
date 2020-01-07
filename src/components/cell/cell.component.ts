import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cell } from '../../interfaces/cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  @Input() cell: Cell;
  @Input() alwaysShown: boolean;

  public getValue(): string {
    if (this.alwaysShown || this.cell.isPermanent) {
      return this.cell.value.toString();
    }

    return this.cell.userValue ? this.cell.userValue.toString() : ``;
  }
}
