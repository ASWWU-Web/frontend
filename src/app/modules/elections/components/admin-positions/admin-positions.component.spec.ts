import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { AdminPositionsComponent } from "./admin-positions.component";

describe("AdminPositionsComponent", () => {
  let component: AdminPositionsComponent;
  let fixture: ComponentFixture<AdminPositionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPositionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
