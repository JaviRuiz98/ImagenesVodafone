import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpositoresComponent } from './expositores.component';

describe('ExpositoresComponent', () => {
  let component: ExpositoresComponent;
  let fixture: ComponentFixture<ExpositoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpositoresComponent]
    });
    fixture = TestBed.createComponent(ExpositoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
