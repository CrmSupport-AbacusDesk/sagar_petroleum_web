import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealeruploadComponent } from './dealerupload.component';

describe('DealeruploadComponent', () => {
  let component: DealeruploadComponent;
  let fixture: ComponentFixture<DealeruploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealeruploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealeruploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
