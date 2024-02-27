/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PasoAsignarElementoFormComponent } from './PasoAsignarElementoForm.component';

describe('PasoAsignarElementoFormComponent', () => {
  let component: PasoAsignarElementoFormComponent;
  let fixture: ComponentFixture<PasoAsignarElementoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasoAsignarElementoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoAsignarElementoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
