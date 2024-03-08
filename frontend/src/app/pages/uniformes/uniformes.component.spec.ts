import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformesComponent } from './uniformes.component';

describe('UniformesComponent', () => {
  let component: UniformesComponent;
  let fixture: ComponentFixture<UniformesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniformesComponent]
    });
    fixture = TestBed.createComponent(UniformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
