import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heavycomponent } from './heavycomponent';

describe('Heavycomponent', () => {
  let component: Heavycomponent;
  let fixture: ComponentFixture<Heavycomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Heavycomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Heavycomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
