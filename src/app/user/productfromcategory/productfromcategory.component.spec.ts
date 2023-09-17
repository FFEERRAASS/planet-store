import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductfromcategoryComponent } from './productfromcategory.component';

describe('ProductfromcategoryComponent', () => {
  let component: ProductfromcategoryComponent;
  let fixture: ComponentFixture<ProductfromcategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductfromcategoryComponent]
    });
    fixture = TestBed.createComponent(ProductfromcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
