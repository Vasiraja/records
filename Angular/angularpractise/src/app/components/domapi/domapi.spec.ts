import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Domapi } from './domapi';

describe('Domapi', () => {
  let component: Domapi;
  let fixture: ComponentFixture<Domapi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Domapi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Domapi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
