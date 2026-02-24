import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formssection } from './formssection';

describe('Formssection', () => {
  let component: Formssection;
  let fixture: ComponentFixture<Formssection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formssection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formssection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
