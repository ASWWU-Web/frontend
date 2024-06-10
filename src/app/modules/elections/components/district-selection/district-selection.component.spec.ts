import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DistrictSelectionComponent } from './district-selection.component';

describe('DistrictSelectionComponent', () => {
  let component: DistrictSelectionComponent;
  let fixture: ComponentFixture<DistrictSelectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
