import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CompletedOrderOnTableComponent} from './completed-order-on-table.component';

describe('CompletedOrderOnTableComponent', () => {
  let component: CompletedOrderOnTableComponent;
  let fixture: ComponentFixture<CompletedOrderOnTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedOrderOnTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedOrderOnTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
