import { TestBed } from '@angular/core/testing';

import { NewuserService } from './newuser.service';

describe('NewuserService', () => {
  let service: NewuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
