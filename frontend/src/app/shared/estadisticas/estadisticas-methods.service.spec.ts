/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EstadisticasMethodsService } from './estadisticas-methods.service';

describe('Service: EstadisticasMethods', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadisticasMethodsService]
    });
  });

  it('should ...', inject([EstadisticasMethodsService], (service: EstadisticasMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
