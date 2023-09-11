import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductplanComponent } from './productplan.component';

describe('ProductplanComponent', () => {
  let component: ProductplanComponent;
  let fixture: ComponentFixture<ProductplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductplanComponent]
    });
    fixture = TestBed.createComponent(ProductplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
