import { TestBed, inject } from '@angular/core/testing';

import { UserManagerService } from './user-manager.service';

describe('UserManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagerService]
    });
  });

  it('should ...', inject([UserManagerService], (service: UserManagerService) => {
    expect(service).toBeTruthy();
  }));
});
