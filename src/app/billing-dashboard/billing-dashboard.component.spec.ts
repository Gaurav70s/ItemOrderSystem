import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BillingDashboardComponent } from './billing-dashboard.component';

describe('BillingDashboardComponent', () => {
  let component: BillingDashboardComponent;
  let fixture: ComponentFixture<BillingDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
