import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnPopupComponent } from './add-on-popup.component';

describe('AddOnPopupComponent', () => {
  let component: AddOnPopupComponent;
  let fixture: ComponentFixture<AddOnPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
