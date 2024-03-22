import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperPieComponent } from './super-pie.component';

describe('SuperPieComponent', () => {
  let component: SuperPieComponent;
  let fixture: ComponentFixture<SuperPieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperPieComponent]
    });
    fixture = TestBed.createComponent(SuperPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
