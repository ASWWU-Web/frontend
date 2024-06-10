import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminBallotModalComponent } from './admin-ballot-modal.component';

describe('AdminBallotModalComponent', () => {
  let component: AdminBallotModalComponent;
  let fixture: ComponentFixture<AdminBallotModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBallotModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBallotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
