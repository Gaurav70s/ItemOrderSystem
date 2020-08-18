import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KotDisplayComponent } from './kot-display.component';

describe('KotDisplayComponent', () => {
  let component: KotDisplayComponent;
  let fixture: ComponentFixture<KotDisplayComponent>;

  beforeEach(async(() => {
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
