/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArrastrarElementoComponent } from './arrastrarElemento.component';

describe('ArrastrarElementoComponent', () => {
  let component: ArrastrarElementoComponent;
  let fixture: ComponentFixture<ArrastrarElementoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrastrarElementoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrastrarElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
