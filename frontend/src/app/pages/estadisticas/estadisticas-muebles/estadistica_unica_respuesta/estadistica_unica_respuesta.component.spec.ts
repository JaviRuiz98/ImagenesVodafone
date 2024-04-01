/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Estadistica_unica_respuestaComponent } from './estadistica_unica_respuesta.component';

describe('Estadistica_unica_respuestaComponent', () => {
  let component: Estadistica_unica_respuestaComponent;
  let fixture: ComponentFixture<Estadistica_unica_respuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Estadistica_unica_respuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Estadistica_unica_respuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
