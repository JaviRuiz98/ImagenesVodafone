import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcoElementoComponent } from './marco-elemento.component';

describe('MarcoElementoComponent', () => {
  let component: MarcoElementoComponent;
  let fixture: ComponentFixture<MarcoElementoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcoElementoComponent]
    });
    fixture = TestBed.createComponent(MarcoElementoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
