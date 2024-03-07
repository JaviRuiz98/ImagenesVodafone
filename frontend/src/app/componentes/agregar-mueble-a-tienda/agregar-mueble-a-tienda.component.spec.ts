import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMuebleATiendaComponent } from './agregar-mueble-a-tienda.component';

describe('AgregarMuebleATiendaComponent', () => {
  let component: AgregarMuebleATiendaComponent;
  let fixture: ComponentFixture<AgregarMuebleATiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarMuebleATiendaComponent]
    });
    fixture = TestBed.createComponent(AgregarMuebleATiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
