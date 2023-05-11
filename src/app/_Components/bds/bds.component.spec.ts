import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BDSComponent } from './bds.component';

describe('BDSComponent', () => {
  let component: BDSComponent;
  let fixture: ComponentFixture<BDSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BDSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BDSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
