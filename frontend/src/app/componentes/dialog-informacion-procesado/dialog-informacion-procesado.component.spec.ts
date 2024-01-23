import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInformacionProcesadoComponent } from './dialog-informacion-procesado.component';

describe('DialogInformacionProcesadoComponent', () => {
  let component: DialogInformacionProcesadoComponent;
  let fixture: ComponentFixture<DialogInformacionProcesadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogInformacionProcesadoComponent]
    });
    fixture = TestBed.createComponent(DialogInformacionProcesadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
