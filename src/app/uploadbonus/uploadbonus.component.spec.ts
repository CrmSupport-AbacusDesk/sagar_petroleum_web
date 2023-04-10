import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadbonusComponent } from './uploadbonus.component';

describe('UploadbonusComponent', () => {
  let component: UploadbonusComponent;
  let fixture: ComponentFixture<UploadbonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadbonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadbonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
