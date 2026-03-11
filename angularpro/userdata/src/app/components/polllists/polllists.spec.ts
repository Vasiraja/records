import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Polllists } from './polllists';

describe('Polllists', () => {
  let component: Polllists;
  let fixture: ComponentFixture<Polllists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Polllists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Polllists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
