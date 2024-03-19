import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidadorComponent } from './validador.component';

describe('ValidadorComponent', () => {
  let component: ValidadorComponent;
  let fixture: ComponentFixture<ValidadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidadorComponent]
    });
    fixture = TestBed.createComponent(ValidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
