import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDePedidosComponent } from './gestion-de-pedidos.component';

describe('GestionDePedidosComponent', () => {
  let component: GestionDePedidosComponent;
  let fixture: ComponentFixture<GestionDePedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDePedidosComponent]
    });
    fixture = TestBed.createComponent(GestionDePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
