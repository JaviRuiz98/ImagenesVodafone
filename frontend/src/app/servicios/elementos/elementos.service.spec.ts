import { TestBed } from '@angular/core/testing';

import { ElementosService } from './elementos.service';

describe('ElementosService', () => {
  let service: ElementosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
