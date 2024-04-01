import { TestBed } from '@angular/core/testing';

import { ProcesadosService } from './procesados.service';

describe('ProcesadosService', () => {
  let service: ProcesadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
