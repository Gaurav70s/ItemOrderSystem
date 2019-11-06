import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenIncompletedOrderComponent } from './kitchen-incompleted-order.component';

describe('KitchenIncompletedOrderComponent', () => {
  let component: KitchenIncompletedOrderComponent;
  let fixture: ComponentFixture<KitchenIncompletedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenIncompletedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenIncompletedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
