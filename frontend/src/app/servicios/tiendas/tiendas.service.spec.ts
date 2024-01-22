import { TestBed } from '@angular/core/testing';

import { TiendasService } from './tiendas.service';

describe('TiendasService', () => {
  let service: TiendasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
