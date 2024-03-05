import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTienda3DComponent } from './plano-tienda-3d.component';

describe('PlanoTienda3DComponent', () => {
  let component: PlanoTienda3DComponent;
  let fixture: ComponentFixture<PlanoTienda3DComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanoTienda3DComponent]
    });
    fixture = TestBed.createComponent(PlanoTienda3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
