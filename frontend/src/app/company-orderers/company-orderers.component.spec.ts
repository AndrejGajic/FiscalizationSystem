import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOrderersComponent } from './company-orderers.component';

describe('CompanyOrderersComponent', () => {
  let component: CompanyOrderersComponent;
  let fixture: ComponentFixture<CompanyOrderersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyOrderersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOrderersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
