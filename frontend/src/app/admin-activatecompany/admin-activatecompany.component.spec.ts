import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivatecompanyComponent } from './admin-activatecompany.component';

describe('AdminActivatecompanyComponent', () => {
  let component: AdminActivatecompanyComponent;
  let fixture: ComponentFixture<AdminActivatecompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActivatecompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActivatecompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
