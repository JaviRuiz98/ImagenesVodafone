/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EnumService } from './enum.service';

describe('Service: Enum', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnumService]
    });
  });

  it('should ...', inject([EnumService], (service: EnumService) => {
    expect(service).toBeTruthy();
  }));
});
