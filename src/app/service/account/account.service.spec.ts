import { inject, TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';

describe('ContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountService]
    });
  });

  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
