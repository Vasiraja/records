import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inputoutputdec } from './inputoutputdec';

describe('Inputoutputdec', () => {
  let component: Inputoutputdec;
  let fixture: ComponentFixture<Inputoutputdec>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inputoutputdec]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inputoutputdec);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
