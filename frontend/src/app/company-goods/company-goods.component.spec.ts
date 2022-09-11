import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyGoodsComponent } from './company-goods.component';

describe('CompanyGoodsComponent', () => {
  let component: CompanyGoodsComponent;
  let fixture: ComponentFixture<CompanyGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
