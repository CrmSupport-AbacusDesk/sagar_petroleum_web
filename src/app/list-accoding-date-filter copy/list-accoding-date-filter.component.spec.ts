import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccodingDateFilterComponent } from './list-accoding-date-filter.component';

describe('ListAccodingDateFilterComponent', () => {
  let component: ListAccodingDateFilterComponent;
  let fixture: ComponentFixture<ListAccodingDateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAccodingDateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccodingDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
