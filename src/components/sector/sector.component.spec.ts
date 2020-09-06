import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Row } from '../../interfaces/board';
import { Cell } from '../../interfaces/cell';
import { SectorComponent } from './sector.component';
import { SectorModule } from './sector.module';

describe('SectorComponent', () => {
  let component: SectorComponent;
  let fixture: ComponentFixture<SectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SectorModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorComponent);
    component = fixture.componentInstance;
    component.positionX = 0;
    component.positionY = 0;
    component.gameStatus = Array(10).fill(null).map((): Row =>
      Array(10).fill(null).map((): Cell => ({
        isPermanent: false,
        hasError: false,
        value: 0,
      })));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
