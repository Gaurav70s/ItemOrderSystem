import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Order.SnackbarComponent } from './order.snackbar.component';

describe('Order.SnackbarComponent', () => {
  let component: Order.SnackbarComponent;
  let fixture: ComponentFixture<Order.SnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Order.SnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Order.SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
