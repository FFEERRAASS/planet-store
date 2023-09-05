import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviouspurchasesComponent } from './previouspurchases.component';

describe('PreviouspurchasesComponent', () => {
  let component: PreviouspurchasesComponent;
  let fixture: ComponentFixture<PreviouspurchasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviouspurchasesComponent]
    });
    fixture = TestBed.createComponent(PreviouspurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
