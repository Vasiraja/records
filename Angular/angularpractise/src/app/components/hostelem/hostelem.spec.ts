import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hostelem } from './hostelem';

describe('Hostelem', () => {
  let component: Hostelem;
  let fixture: ComponentFixture<Hostelem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hostelem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hostelem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
