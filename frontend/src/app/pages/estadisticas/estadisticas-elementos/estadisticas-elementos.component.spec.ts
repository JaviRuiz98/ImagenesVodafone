import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasElementosComponent } from './estadisticas-elementos.component';

describe('EstadisticasElementosComponent', () => {
  let component: EstadisticasElementosComponent;
  let fixture: ComponentFixture<EstadisticasElementosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasElementosComponent]
    });
    fixture = TestBed.createComponent(EstadisticasElementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
