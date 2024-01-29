import { TestBed } from '@angular/core/testing';

import { PublicMethodsService } from './public-methods.service';

describe('PublicMethodsService', () => {
  let service: PublicMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
