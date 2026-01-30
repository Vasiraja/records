import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rxjsangular } from './rxjsangular';

describe('Rxjsangular', () => {
  let component: Rxjsangular;
  let fixture: ComponentFixture<Rxjsangular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rxjsangular]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rxjsangular);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
