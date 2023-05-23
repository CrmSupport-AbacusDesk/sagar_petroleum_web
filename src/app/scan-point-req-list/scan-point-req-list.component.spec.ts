import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPointReqListComponent } from './scan-point-req-list.component';

describe('ScanPointReqListComponent', () => {
  let component: ScanPointReqListComponent;
  let fixture: ComponentFixture<ScanPointReqListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanPointReqListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPointReqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
