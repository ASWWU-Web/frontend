import { Component, Input, OnInit } from '@angular/core';
import { CURRENT_YEAR, DEFAULT_PHOTO, MEDIA_SM } from '../../../../../shared-ng/config';
import { RequestService } from '../../../../../shared-ng/services/services';
import { PartialProfile } from 'src/shared-ng/interfaces/mask';


@Component({
  selector: 'profile-sm',
  templateUrl: 'profile-sm.component.html',
  styleUrls: ['profile-sm.styles.css'],
})


export class ProfileSmComponent implements OnInit {
  link = "";

  constructor(private rs: RequestService) { }

  ngOnInit() {
    this.link = this.getPhotoLinkSync(this.searchResult.photo);
  }

  @Input() searchResult: PartialProfile;
  @Input() year: string = undefined;
  current_year = CURRENT_YEAR;

  // Photo url to link function returns proper url and BLANK photo if photo == "None"
  getPhotoLinkSync(url: string) {
    let link = "";
    if (url && url != '') {
      link = MEDIA_SM + '/' + url;
      if (url == DEFAULT_PHOTO) link = DEFAULT_PHOTO;
    } else {
      link = DEFAULT_PHOTO;
    }
    return link;
  }
}
