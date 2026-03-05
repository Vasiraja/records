import { TestBed } from '@angular/core/testing';

import { Socketserv } from './socketserv';

describe('Socketserv', () => {
  let service: Socketserv;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Socketserv);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 
 