import { Component, Input, inject } from "@angular/core";
import { ProfileModel } from "../../profile.model";
import { FieldsInOrder } from "../../fields";
import {
  CURRENT_YEAR,
  DEFAULT_PHOTO,
  MEDIA_MD,
  SAML_URL,
} from "../../../../../shared-ng/config";
import { AuthService } from "../../../../../shared-ng/services/services";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "profile-full",
  templateUrl: "profile-full.component.html",
  styleUrls: ["profile-full.styles.css"],
})
export class ProfileFullComponent {
  @Input() username: string;
  @Input() profile: ProfileModel;

  fieldsInOrder: string[] = FieldsInOrder;
  currentYear: string = CURRENT_YEAR;
  public activeModal: NgbActiveModal;
  constructor(private as: AuthService) {
    this.activeModal = inject(NgbActiveModal);
  }

  displayKey(key: string): string {
    return key.replace(/_/g, " ");
  }

  getPhotoLink(url: string) {
    if (url && url != "None") {
      // hacky way to make sure that the default photo is
      // being pulled from the static assets folder
      if (url == DEFAULT_PHOTO) return url;
      return MEDIA_MD + "/" + url;
    } else {
      return DEFAULT_PHOTO;
    }
  }
  isLoggedOn() {
    return this.as.isLoggedIn();
  }
  getSamlLink() {
    return SAML_URL + "?redirectURI=" + window.location.pathname;
  }
  generateWebsiteLink(website: string) {
    if (!website.startsWith("http")) {
      return "//" + website;
    }
    return website;
  }
  closeModal() {
    this.activeModal.close("Close click");
  }
  get schoolYear(): string {
    // we store the date at the end of the path
    return location.pathname.split("/").pop() ?? "";
  }
}
