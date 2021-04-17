import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateItemImagesComponent } from './create-item-images.component';

describe('CreateItemImagesComponent', () => {
  let component: CreateItemImagesComponent;
  let fixture: ComponentFixture<CreateItemImagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateItemImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
