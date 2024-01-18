import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraMenuComponent } from './barra-menu.component';

describe('BarraMenuComponent', () => {
  let component: BarraMenuComponent;
  let fixture: ComponentFixture<BarraMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraMenuComponent]
    });
    fixture = TestBed.createComponent(BarraMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
