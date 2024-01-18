import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoDobleComponent } from './elemento-doble.component';

describe('ElementoDobleComponent', () => {
  let component: ElementoDobleComponent;
  let fixture: ComponentFixture<ElementoDobleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElementoDobleComponent]
    });
    fixture = TestBed.createComponent(ElementoDobleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
