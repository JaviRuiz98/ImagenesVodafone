import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementosComponent } from './elementos.component';

describe('ElementosComponent', () => {
  let component: ElementosComponent;
  let fixture: ComponentFixture<ElementosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElementosComponent]
    });
    fixture = TestBed.createComponent(ElementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
