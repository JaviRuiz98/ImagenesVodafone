import { TestBed } from '@angular/core/testing';

import { TiendasServicesService } from './tiendas-services.service';

describe('TiendasServicesService', () => {
  let service: TiendasServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiendasServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
