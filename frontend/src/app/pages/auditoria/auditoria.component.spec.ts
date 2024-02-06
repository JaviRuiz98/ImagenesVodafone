import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaComponent } from './auditoria.component';

describe('AuditoriaComponent', () => {
  let component: AuditoriaComponent;
  let fixture: ComponentFixture<AuditoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditoriaComponent]
    });
    fixture = TestBed.createComponent(AuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
