import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSlaesComponent } from './assign-slaes.component';

describe('AssignSlaesComponent', () => {
  let component: AssignSlaesComponent;
  let fixture: ComponentFixture<AssignSlaesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSlaesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSlaesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
