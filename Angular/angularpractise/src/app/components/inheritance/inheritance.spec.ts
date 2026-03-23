import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inheritance } from './inheritance';

describe('Inheritance', () => {
  let component: Inheritance;
  let fixture: ComponentFixture<Inheritance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inheritance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inheritance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
