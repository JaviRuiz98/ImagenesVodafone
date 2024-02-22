/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Paso1FormComponent } from './Paso1Form.component';

describe('Paso1FormComponent', () => {
  let component: Paso1FormComponent;
  let fixture: ComponentFixture<Paso1FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Paso1FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paso1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
