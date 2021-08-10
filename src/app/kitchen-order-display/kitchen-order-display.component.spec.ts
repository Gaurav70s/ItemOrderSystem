import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {KitchenOrderDisplayComponent} from './kitchen-order-display.component';

describe('KitchenOrderDisplayComponent', () => {
  let component: KitchenOrderDisplayComponent;
  let fixture: ComponentFixture<KitchenOrderDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [KitchenOrderDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenOrderDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
