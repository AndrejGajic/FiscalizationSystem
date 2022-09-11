import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddcompanyComponent } from './admin-addcompany.component';

describe('AdminAddcompanyComponent', () => {
  let component: AdminAddcompanyComponent;
  let fixture: ComponentFixture<AdminAddcompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddcompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
