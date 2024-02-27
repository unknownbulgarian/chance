import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authCheckerGuard } from './auth-checker.guard';

describe('authCheckerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authCheckerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
