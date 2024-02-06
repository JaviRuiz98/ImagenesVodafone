import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeAuditoriasComponent } from './gestion-de-auditorias.component';

describe('GestionDeAuditoriasComponent', () => {
  let component: GestionDeAuditoriasComponent;
  let fixture: ComponentFixture<GestionDeAuditoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDeAuditoriasComponent]
    });
    fixture = TestBed.createComponent(GestionDeAuditoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
