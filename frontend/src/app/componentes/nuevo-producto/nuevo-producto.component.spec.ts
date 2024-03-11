import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProductoComponent } from './nuevo-producto.component';

describe('NuevoProductoComponent', () => {
  let component: NuevoProductoComponent;
  let fixture: ComponentFixture<NuevoProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoProductoComponent]
    });
    fixture = TestBed.createComponent(NuevoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
