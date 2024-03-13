import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNuevaTiendaComponent } from './dialog-nueva-tienda.component';

describe('DialogNuevaTiendaComponent', () => {
  let component: DialogNuevaTiendaComponent;
  let fixture: ComponentFixture<DialogNuevaTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNuevaTiendaComponent]
    });
    fixture = TestBed.createComponent(DialogNuevaTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
