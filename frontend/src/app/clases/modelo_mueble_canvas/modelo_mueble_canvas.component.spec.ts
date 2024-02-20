/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Modelo_mueble_canvasComponent } from './modelo_mueble_canvas.component';

describe('Modelo_mueble_canvasComponent', () => {
  let component: Modelo_mueble_canvasComponent;
  let fixture: ComponentFixture<Modelo_mueble_canvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Modelo_mueble_canvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Modelo_mueble_canvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
