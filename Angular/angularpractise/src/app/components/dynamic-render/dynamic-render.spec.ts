import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRender } from './dynamic-render';

describe('DynamicRender', () => {
  let component: DynamicRender;
  let fixture: ComponentFixture<DynamicRender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicRender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicRender);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
