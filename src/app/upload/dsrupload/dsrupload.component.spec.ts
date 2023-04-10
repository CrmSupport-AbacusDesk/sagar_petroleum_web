import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsruploadComponent } from './dsrupload.component';

describe('DsruploadComponent', () => {
  let component: DsruploadComponent;
  let fixture: ComponentFixture<DsruploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsruploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsruploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
