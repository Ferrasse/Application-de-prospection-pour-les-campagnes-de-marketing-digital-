import { TestBed } from '@angular/core/testing';

import { EmailMessagesService } from './email-messages.service';

describe('EmailMessagesService', () => {
  let service: EmailMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
