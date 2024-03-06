import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTiendaComponent } from './plano-tienda.component';

describe('PlanoTiendaComponent', () => {
  let component: PlanoTiendaComponent;
  let fixture: ComponentFixture<PlanoTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanoTiendaComponent]
    });
    fixture = TestBed.createComponent(PlanoTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
