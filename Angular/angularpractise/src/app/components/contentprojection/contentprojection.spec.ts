import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contentprojection } from './contentprojection';

describe('Contentprojection', () => {
  let component: Contentprojection;
  let fixture: ComponentFixture<Contentprojection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contentprojection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contentprojection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
