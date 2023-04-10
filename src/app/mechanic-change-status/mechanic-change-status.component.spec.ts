import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicChangeStatusComponent } from './mechanic-change-status.component';

describe('MechanicChangeStatusComponent', () => {
  let component: MechanicChangeStatusComponent;
  let fixture: ComponentFixture<MechanicChangeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MechanicChangeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicChangeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
