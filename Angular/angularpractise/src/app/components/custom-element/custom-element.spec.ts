import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomElementComponent } from './custom-element';

describe('CustomElement', () => {
  let component: CustomElementComponent;
  let fixture: ComponentFixture<CustomElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomElementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
