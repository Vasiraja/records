import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Roleanalysis } from './roleanalysis';

describe('Roleanalysis', () => {
  let component: Roleanalysis;
  let fixture: ComponentFixture<Roleanalysis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Roleanalysis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Roleanalysis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
