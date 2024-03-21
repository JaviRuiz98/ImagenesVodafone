import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasMueblesComponent } from './estadisticas-muebles.component';

describe('EstadisticasMueblesComponent', () => {
  let component: EstadisticasMueblesComponent;
  let fixture: ComponentFixture<EstadisticasMueblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasMueblesComponent]
    });
    fixture = TestBed.createComponent(EstadisticasMueblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
