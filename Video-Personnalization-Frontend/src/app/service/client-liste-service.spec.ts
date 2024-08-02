import { TestBed } from '@angular/core/testing';

import { ClientListServiceService } from './client-list-service.service';

describe('ClientListServiceService', () => {
  let service: ClientListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
