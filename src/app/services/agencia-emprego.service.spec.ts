import { TestBed } from '@angular/core/testing';

import { AgenciaEmpregoService } from './agencia-emprego.service';

describe('AgenciaEmpregoService', () => {
  let service: AgenciaEmpregoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenciaEmpregoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
