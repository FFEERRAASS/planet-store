import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartreportsComponent } from './chartreports.component';

describe('ChartreportsComponent', () => {
  let component: ChartreportsComponent;
  let fixture: ComponentFixture<ChartreportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartreportsComponent]
    });
    fixture = TestBed.createComponent(ChartreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
