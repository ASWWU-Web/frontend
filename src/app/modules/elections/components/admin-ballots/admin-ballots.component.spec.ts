import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminBallotsComponent } from './admin-ballots.component';

describe('AdminBallotsComponent', () => {
  let component: AdminBallotsComponent;
  let fixture: ComponentFixture<AdminBallotsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBallotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBallotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
