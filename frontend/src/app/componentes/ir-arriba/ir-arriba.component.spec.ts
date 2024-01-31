import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrArribaComponent } from './ir-arriba.component';

describe('IrArribaComponent', () => {
  let component: IrArribaComponent;
  let fixture: ComponentFixture<IrArribaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IrArribaComponent]
    });
    fixture = TestBed.createComponent(IrArribaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
