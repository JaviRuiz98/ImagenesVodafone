import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarAuditoriaComponent } from './cargar-auditoria.component';

describe('CargarAuditoriaComponent', () => {
  let component: CargarAuditoriaComponent;
  let fixture: ComponentFixture<CargarAuditoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarAuditoriaComponent]
    });
    fixture = TestBed.createComponent(CargarAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
