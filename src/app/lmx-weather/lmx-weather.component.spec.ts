import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LMXWeatherComponent } from './lmx-weather.component';

describe('LMXWeatherComponent', () => {
  let component: LMXWeatherComponent;
  let fixture: ComponentFixture<LMXWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LMXWeatherComponent]
    });
    fixture = TestBed.createComponent(LMXWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
