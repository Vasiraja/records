import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formscompo } from './formscompo';

describe('Formscompo', () => {
  let component: Formscompo;
  let fixture: ComponentFixture<Formscompo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formscompo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formscompo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
