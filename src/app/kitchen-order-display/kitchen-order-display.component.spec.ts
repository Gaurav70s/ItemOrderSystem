import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenOrderDisplayComponent } from './kitchen-order-display.component';

describe('KitchenOrderDisplayComponent', () => {
  let component: KitchenOrderDisplayComponent;
  let fixture: ComponentFixture<KitchenOrderDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenOrderDisplayComponent ]
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
