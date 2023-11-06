import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LMXCalculatorComponent } from './lmx-calculator.component';

describe('LMXCalculatorComponent', () => {
  let component: LMXCalculatorComponent;
  let fixture: ComponentFixture<LMXCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LMXCalculatorComponent]
    });
    fixture = TestBed.createComponent(LMXCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
