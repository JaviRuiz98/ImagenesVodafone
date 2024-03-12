import { TestBed } from '@angular/core/testing';

import { UniformesService } from './uniformes.service';

describe('UniformesService', () => {
  let service: UniformesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniformesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
