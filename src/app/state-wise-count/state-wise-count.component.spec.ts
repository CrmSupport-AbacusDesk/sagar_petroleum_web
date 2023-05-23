import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateWiseCountComponent } from './state-wise-count.component';

describe('StateWiseCountComponent', () => {
  let component: StateWiseCountComponent;
  let fixture: ComponentFixture<StateWiseCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateWiseCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateWiseCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
