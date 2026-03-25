import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eventlisteners } from './eventlisteners';

describe('Eventlisteners', () => {
  let component: Eventlisteners;
  let fixture: ComponentFixture<Eventlisteners>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eventlisteners]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eventlisteners);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
