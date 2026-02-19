import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rxjstask } from './rxjstask';

describe('Rxjstask', () => {
  let component: Rxjstask;
  let fixture: ComponentFixture<Rxjstask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rxjstask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rxjstask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
