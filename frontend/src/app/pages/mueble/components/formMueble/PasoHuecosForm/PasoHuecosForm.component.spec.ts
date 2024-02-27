/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PasoHuecosFormComponent } from './PasoHuecosForm.component';

describe('PasoHuecosFormComponent', () => {
  let component: PasoHuecosFormComponent;
  let fixture: ComponentFixture<PasoHuecosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasoHuecosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoHuecosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
