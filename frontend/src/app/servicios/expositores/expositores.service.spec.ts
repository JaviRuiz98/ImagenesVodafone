import { TestBed } from '@angular/core/testing';

import { ExpositoresService } from './expositores.service';

describe('ExpositoresService', () => {
  let service: ExpositoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpositoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
