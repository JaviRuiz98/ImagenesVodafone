import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraMultiusoComponent } from './barra-multiuso.component';

describe('BarraMultiusoComponent', () => {
  let component: BarraMultiusoComponent;
  let fixture: ComponentFixture<BarraMultiusoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraMultiusoComponent]
    });
    fixture = TestBed.createComponent(BarraMultiusoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
