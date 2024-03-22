import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasIaComponent } from './estadisticas-ia.component';

describe('EstadisticasIaComponent', () => {
  let component: EstadisticasIaComponent;
  let fixture: ComponentFixture<EstadisticasIaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasIaComponent]
    });
    fixture = TestBed.createComponent(EstadisticasIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
