import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LMXRegistryComponent } from './lmx-registry.component';

describe('LMXRegistryComponent', () => {
  let component: LMXRegistryComponent;
  let fixture: ComponentFixture<LMXRegistryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LMXRegistryComponent]
    });
    fixture = TestBed.createComponent(LMXRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
