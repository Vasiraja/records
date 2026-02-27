import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Welcomepage } from './welcomepage';

describe('Welcomepage', () => {
  let component: Welcomepage;
  let fixture: ComponentFixture<Welcomepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Welcomepage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Welcomepage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
