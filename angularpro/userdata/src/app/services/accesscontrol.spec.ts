import { TestBed } from '@angular/core/testing';

import { Accesscontrol } from './accesscontrol';

describe('Accesscontrol', () => {
  let service: Accesscontrol;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Accesscontrol);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
