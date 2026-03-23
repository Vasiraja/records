import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Angulareighteen } from './angulareighteen';

describe('Angulareighteen', () => {
  let component: Angulareighteen;
  let fixture: ComponentFixture<Angulareighteen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Angulareighteen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Angulareighteen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
