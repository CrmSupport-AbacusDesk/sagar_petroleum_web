import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributoruploadComponent } from './distributorupload.component';

describe('DistributoruploadComponent', () => {
  let component: DistributoruploadComponent;
  let fixture: ComponentFixture<DistributoruploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributoruploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributoruploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
