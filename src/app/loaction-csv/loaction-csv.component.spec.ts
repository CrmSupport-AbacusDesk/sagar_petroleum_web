import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoactionCsvComponent } from './loaction-csv.component';

describe('LoactionCsvComponent', () => {
  let component: LoactionCsvComponent;
  let fixture: ComponentFixture<LoactionCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoactionCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoactionCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
