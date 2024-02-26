import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateInformeComponent } from './template-informe.component';

describe('TemplateInformeComponent', () => {
  let component: TemplateInformeComponent;
  let fixture: ComponentFixture<TemplateInformeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateInformeComponent]
    });
    fixture = TestBed.createComponent(TemplateInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
