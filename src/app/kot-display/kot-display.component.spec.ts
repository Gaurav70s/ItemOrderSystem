import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KotDisplayComponent } from './kot-display.component';

describe('KotDisplayComponent', () => {
  let component: KotDisplayComponent;
  let fixture: ComponentFixture<KotDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KotDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KotDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
