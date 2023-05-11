import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavigateComponent } from './app-navigate.component';

describe('AppNavigateComponent', () => {
  let component: AppNavigateComponent;
  let fixture: ComponentFixture<AppNavigateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNavigateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
