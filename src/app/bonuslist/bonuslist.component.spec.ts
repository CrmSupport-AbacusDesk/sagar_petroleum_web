import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonuslistComponent } from './bonuslist.component';

describe('BonuslistComponent', () => {
  let component: BonuslistComponent;
  let fixture: ComponentFixture<BonuslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonuslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
