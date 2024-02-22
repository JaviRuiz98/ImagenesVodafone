import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarcarExpositorComponent } from './remarcar-expositor.component';

describe('RemarcarExpositorComponent', () => {
  let component: RemarcarExpositorComponent;
  let fixture: ComponentFixture<RemarcarExpositorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemarcarExpositorComponent]
    });
    fixture = TestBed.createComponent(RemarcarExpositorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
