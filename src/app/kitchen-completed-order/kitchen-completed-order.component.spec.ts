import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenCompletedOrderComponent } from './kitchen-completed-order.component';

describe('KitchenCompletedOrderComponent', () => {
  let component: KitchenCompletedOrderComponent;
  let fixture: ComponentFixture<KitchenCompletedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenCompletedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenCompletedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
