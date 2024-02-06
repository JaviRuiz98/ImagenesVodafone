import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListaAuditoriaComponent } from './item-lista-auditoria.component';

describe('ItemListaAuditoriaComponent', () => {
  let component: ItemListaAuditoriaComponent;
  let fixture: ComponentFixture<ItemListaAuditoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListaAuditoriaComponent]
    });
    fixture = TestBed.createComponent(ItemListaAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
