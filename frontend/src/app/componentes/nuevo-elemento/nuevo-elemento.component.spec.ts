import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoElementoComponent } from './nuevo-elemento.component';

describe('NuevoElementoComponent', () => {
  let component: NuevoElementoComponent;
  let fixture: ComponentFixture<NuevoElementoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoElementoComponent]
    });
    fixture = TestBed.createComponent(NuevoElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
