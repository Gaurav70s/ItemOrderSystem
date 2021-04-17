import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CounterViewComponent } from './counter-view.component';

describe('CounterViewComponent', () => {
  let component: CounterViewComponent;
  let fixture: ComponentFixture<CounterViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
