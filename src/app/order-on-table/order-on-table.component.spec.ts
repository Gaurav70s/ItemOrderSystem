import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOnTableComponent } from './order-on-table.component';

describe('OrderOnTableComponent', () => {
  let component: OrderOnTableComponent;
  let fixture: ComponentFixture<OrderOnTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderOnTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOnTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
