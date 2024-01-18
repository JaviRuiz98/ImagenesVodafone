import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoSimpleComponent } from './elemento-simple.component';

describe('ElementoSimpleComponent', () => {
  let component: ElementoSimpleComponent;
  let fixture: ComponentFixture<ElementoSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElementoSimpleComponent]
    });
    fixture = TestBed.createComponent(ElementoSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
