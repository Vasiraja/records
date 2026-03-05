import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Onlineusers } from './onlineusers';

describe('Onlineusers', () => {
  let component: Onlineusers;
  let fixture: ComponentFixture<Onlineusers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Onlineusers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Onlineusers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
