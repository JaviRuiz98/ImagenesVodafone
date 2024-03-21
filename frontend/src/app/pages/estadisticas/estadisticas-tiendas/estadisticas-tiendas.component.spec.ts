import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasTiendasComponent } from './estadisticas-tiendas.component';

describe('EstadisticasTiendasComponent', () => {
  let component: EstadisticasTiendasComponent;
  let fixture: ComponentFixture<EstadisticasTiendasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasTiendasComponent]
    });
    fixture = TestBed.createComponent(EstadisticasTiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
