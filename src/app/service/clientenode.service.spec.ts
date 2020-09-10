import { TestBed } from '@angular/core/testing';

import { ClientenodeService } from './clientenode.service';

describe('ClientenodeService', () => {
  let service: ClientenodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientenodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
