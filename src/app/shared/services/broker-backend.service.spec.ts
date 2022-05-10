import { TestBed } from '@angular/core/testing';

import { BrokerBackendService } from './broker-backend.service';

describe('BrokerBackendService', () => {
  let service: BrokerBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrokerBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
