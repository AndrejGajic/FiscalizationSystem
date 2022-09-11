import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddcustomerComponent } from './admin-addcustomer.component';

describe('AdminAddcustomerComponent', () => {
  let component: AdminAddcustomerComponent;
  let fixture: ComponentFixture<AdminAddcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddcustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
