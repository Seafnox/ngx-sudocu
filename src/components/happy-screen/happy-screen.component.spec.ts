import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HappyScreenComponent } from './happy-screen.component';

describe('HappyScreenComponent', () => {
  let component: HappyScreenComponent;
  let fixture: ComponentFixture<HappyScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
