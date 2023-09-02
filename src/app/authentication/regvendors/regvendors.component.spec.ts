import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegvendorsComponent } from './regvendors.component';

describe('RegvendorsComponent', () => {
  let component: RegvendorsComponent;
  let fixture: ComponentFixture<RegvendorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegvendorsComponent]
    });
    fixture = TestBed.createComponent(RegvendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
