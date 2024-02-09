import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoExpositorComponent } from './nuevo-expositor.component';

describe('NuevoExpositorComponent', () => {
  let component: NuevoExpositorComponent;
  let fixture: ComponentFixture<NuevoExpositorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoExpositorComponent]
    });
    fixture = TestBed.createComponent(NuevoExpositorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
