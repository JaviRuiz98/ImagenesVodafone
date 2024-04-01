import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarComponent } from './stacked-bar.component';

describe('StackedBarComponent', () => {
  let component: StackedBarComponent;
  let fixture: ComponentFixture<StackedBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StackedBarComponent]
    });
    fixture = TestBed.createComponent(StackedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
