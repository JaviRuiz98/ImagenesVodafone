import { TestBed } from '@angular/core/testing';

import { SelectorImagenesService } from './selector-imagenes.service';

describe('SelectorImagenesService', () => {
  let service: SelectorImagenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectorImagenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
