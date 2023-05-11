import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityreportingComponent } from './facilityreporting.component';

describe('FacilityreportingComponent', () => {
  let component: FacilityreportingComponent;
  let fixture: ComponentFixture<FacilityreportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityreportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityreportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
