import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canactivegGuard } from './canactiveg-guard';

describe('canactivegGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canactivegGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
