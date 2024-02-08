import { TestBed } from '@angular/core/testing';

import { ProcesamientoService } from './procesamiento-services.service';

describe('ProcesamientoServicesService', () => {
  let service: ProcesamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
