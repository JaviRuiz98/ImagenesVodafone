import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperDonutComponent } from './super-donut.component';

describe('SuperDonutComponent', () => {
  let component: SuperDonutComponent;
  let fixture: ComponentFixture<SuperDonutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperDonutComponent]
    });
    fixture = TestBed.createComponent(SuperDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
