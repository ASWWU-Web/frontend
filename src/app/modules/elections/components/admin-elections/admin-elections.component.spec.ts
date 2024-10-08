import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { AdminElectionsComponent } from "./admin-elections.component";

describe("AdminElectionsComponent", () => {
  let component: AdminElectionsComponent;
  let fixture: ComponentFixture<AdminElectionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminElectionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
