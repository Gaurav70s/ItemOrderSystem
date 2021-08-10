import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AddonModalComponent} from './addon-modal.component';

describe('AddonModalComponent', () => {
  let component: AddonModalComponent;
  let fixture: ComponentFixture<AddonModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddonModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
