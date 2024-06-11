import { Component, Input } from '@angular/core';
import { ProfileModel } from '../../profile.model';
import { FieldsInOrder } from '../../fields';
import { MEDIA_MD, DEFAULT_PHOTO, SAML_URL, CURRENT_YEAR } from '../../../../../shared-ng/config';
import { AuthService } from '../../../../../shared-ng/services/services'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'profile-full',
  templateUrl: 'profile-full.component.html',
  styleUrls: ['profile-full.styles.css'],
})
export class ProfileFullComponent {
  @Input('User') username: string;
  @Input() profile: ProfileModel;

  fieldsInOrder: string[] = FieldsInOrder;
  currentYear: string = CURRENT_YEAR;

  constructor(public activeModal: NgbActiveModal, private as: AuthService) { }

  displayKey(key: string): string { return key.replace(/_/g, ' '); }

  getPhotoLink(url: string) {
    if (url && url != 'None') {
      return MEDIA_MD + '/' + url;
    } else {
      return MEDIA_MD + '/' + DEFAULT_PHOTO;
    }
  }
  isLoggedOn() {
    return this.as.isLoggedIn();
  }
  getSamlLink() {
    return SAML_URL + '?redirectURI=' + window.location.pathname;
  }
  generateWebsiteLink(website: string) {
    if (!website.startsWith('http')) {
      return '//' + website;
    }
    return website;
  }
}
