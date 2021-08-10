import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SoftwareRatingComponent} from './software-rating.component';

describe('SoftwareRatingComponent', () => {
  let component: SoftwareRatingComponent;
  let fixture: ComponentFixture<SoftwareRatingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SoftwareRatingComponent]
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
