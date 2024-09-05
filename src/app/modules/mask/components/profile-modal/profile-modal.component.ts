import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { CURRENT_YEAR } from "../../../../../shared-ng/config";
import { ProfileModel } from "../../profile.model";
import { MaskRequestService } from "../../../../../shared-ng/services/services";
import { ActivatedRoute } from "@angular/router";
import { PlatformLocation } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile-modal-content",
  templateUrl: "./profile-modal.component.html",
  styleUrls: ["./profile-modal.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileModalContentComponent implements OnInit {
  @Input() username: string;
  @Input() year: string;
  profile: ProfileModel;
  url: string;
  display_url: string;

  constructor(
    public activeModal: NgbActiveModal,
    private mrs: MaskRequestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.year = this.year ? this.year : CURRENT_YEAR;

    // distinguish between development and production
    // TODO: this needs to be updated once mask repo is merged into frontend repo
    if (this.router.url === "/") {
      this.url = "/profile/" + this.year + "/" + this.username;
      this.display_url = "/profile/" + this.username + "/" + this.year; // URL to display
    } else {
      this.url = "/mask" + "/profile/" + this.year + "/" + this.username;
      this.display_url =
        "/mask" + "/profile/" + this.username + "/" + this.year; // URL to display
    }

    const maskObservable = this.mrs.readProfile(this.year, this.username);
    maskObservable.subscribe((data) => {
      this.profile = new ProfileModel(data, this.year);
    });
    // this.rs.get(url, (data) => this.profile = new ProfileModel(data), undefined);
    const stateObj = { hello: "there" };
    history.pushState(stateObj, "Profile View", this.display_url);
  }
}

@Component({
  selector: "app-profile-modal",
  template: ``,
  styleUrls: ["./profile-modal.component.css"],
})
export class ProfileModalComponent implements OnInit {
  modal: NgbModalRef;
  backButton = false;

  constructor(
    private modalService: NgbModal,
    private location: PlatformLocation,
  ) {
    // Closes modal if back button is clicked
    location.onPopState(() => {
      if (this.backButton) {
        this.modal.close();
        this.backButton = false;
      }
    });
  }

  ngOnInit() { }

  open(username: string, year: string): void {
    // save the modal reference so we can close it
    this.modal = this.modalService.open(ProfileModalContentComponent, {
      size: "lg",
      windowClass: "modal-adaptive",
    });
    // pass data to the modal inputs
    this.modal.componentInstance.username = username;
    this.modal.componentInstance.year = year;
    // Flag variable will be true for location.onPopState if the back button was clicked; else will be set to false first
    this.backButton = true;

    // Promise is rejected if click outside of modal or exit button is clicked; resolved if back button is clicked
    this.modal.result.then(
      () => { },
      () => {
        this.backButton = false;
        history.back();
      },
    );
  }
}
