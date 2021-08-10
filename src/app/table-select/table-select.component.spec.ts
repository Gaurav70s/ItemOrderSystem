import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TableSelectComponent} from './table-select.component';

describe('TableSelectComponent', () => {
  let component: TableSelectComponent;
  let fixture: ComponentFixture<TableSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TableSelectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
