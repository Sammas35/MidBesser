import { TestBed, inject } from '@angular/core/testing';

import { DomainIoService } from './domain-io.service';

describe('DomainIoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomainIoService]
    });
  });

  it('should be created', inject([DomainIoService], (service: DomainIoService) => {
    expect(service).toBeTruthy();
  }));
});
