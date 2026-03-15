import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkRolePopup } from './bulk-role-popup';

describe('BulkRolePopup', () => {
  let component: BulkRolePopup;
  let fixture: ComponentFixture<BulkRolePopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkRolePopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkRolePopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
