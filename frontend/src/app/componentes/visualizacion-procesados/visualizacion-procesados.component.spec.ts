import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacionProcesadosComponent } from './visualizacion-procesados.component';

describe('VisualizacionProcesadosComponent', () => {
  let component: VisualizacionProcesadosComponent;
  let fixture: ComponentFixture<VisualizacionProcesadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizacionProcesadosComponent]
    });
    fixture = TestBed.createComponent(VisualizacionProcesadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
