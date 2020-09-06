import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellComponent } from './cell.component';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    component.cell = {
      hasError: false,
      isPermanent: false,
      value: 0,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
