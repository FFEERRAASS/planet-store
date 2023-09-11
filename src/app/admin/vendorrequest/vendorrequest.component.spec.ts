import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorrequestComponent } from './vendorrequest.component';

describe('VendorrequestComponent', () => {
  let component: VendorrequestComponent;
  let fixture: ComponentFixture<VendorrequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorrequestComponent]
    });
    fixture = TestBed.createComponent(VendorrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
