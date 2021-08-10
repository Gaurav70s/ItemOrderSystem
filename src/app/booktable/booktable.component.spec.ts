import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BooktableComponent} from './booktable.component';

describe('BooktableComponent', () => {
  let component: BooktableComponent;
  let fixture: ComponentFixture<BooktableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BooktableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooktableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
