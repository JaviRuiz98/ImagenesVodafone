import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasUniformesComponent } from './estadisticas-uniformes.component';

describe('EstadisticasUniformesComponent', () => {
  let component: EstadisticasUniformesComponent;
  let fixture: ComponentFixture<EstadisticasUniformesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasUniformesComponent]
    });
    fixture = TestBed.createComponent(EstadisticasUniformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
