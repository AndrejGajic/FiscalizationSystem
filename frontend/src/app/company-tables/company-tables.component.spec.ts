import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTablesComponent } from './company-tables.component';

describe('CompanyTablesComponent', () => {
  let component: CompanyTablesComponent;
  let fixture: ComponentFixture<CompanyTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
