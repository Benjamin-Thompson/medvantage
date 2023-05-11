import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitylegendComponent } from './facilitylegend.component';

describe('FacilitylegendComponent', () => {
  let component: FacilitylegendComponent;
  let fixture: ComponentFixture<FacilitylegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitylegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitylegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
