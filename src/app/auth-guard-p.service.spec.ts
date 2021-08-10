import {TestBed} from '@angular/core/testing';

import {AuthGuardPService} from './auth-guard-p.service';

describe('AuthGuardPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardPService = TestBed.get(AuthGuardPService);
    expect(service).toBeTruthy();
  });
});
