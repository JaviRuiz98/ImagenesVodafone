import { TestBed } from '@angular/core/testing';

import { ProcesamientoServicesService } from './procesamiento-services.service';

describe('ProcesamientoServicesService', () => {
  let service: ProcesamientoServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesamientoServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
