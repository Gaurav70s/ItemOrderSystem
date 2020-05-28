import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareRatingComponent } from './software-rating.component';

describe('SoftwareRatingComponent', () => {
  let component: SoftwareRatingComponent;
  let fixture: ComponentFixture<SoftwareRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwareRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
