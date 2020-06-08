import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { RequestService } from '../../../shared-ng/services/request.service';
import { CURRENT_YEAR, MEDIA_XS, DEFAULT_PHOTO } from '../../config';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnChanges {
  @Input() profileUserName: string;
  @Input() showPhoto: boolean;
  @Input() showEmail: boolean;
  @Input() fields: string[];
  profileData: any;
  media_xs = MEDIA_XS;
  MASK = 'https://aswwu.com/mask/profile';

  constructor( private rs: RequestService ) { }

  usernameFallback() {
    this.showPhoto = false;
    this.showEmail = false;
    let author = null;
    try { // this try-catch block originally from page-card.component
      author = this.profileUserName.replace(/\./gi, ' ');
      // https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
      author = author.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    } catch (err) {
      author = null;
    }
    this.profileData = {
      'full_name': author,
    };
  }

  getPhotoLink(url: string) {
        if (url && url !== 'None') {
            return MEDIA_XS + '/' + url;
        } else {
            return MEDIA_XS + '/' + DEFAULT_PHOTO;
        }
    }

  ngOnChanges () {
    this.rs.get('/profile/' + CURRENT_YEAR + '/' + this.profileUserName).subscribe((data) => {
      this.profileData = data;
      if (this.profileData.error) {
        this.usernameFallback();
      }
      if (this.profileData.photo === 'None') {
        this.showPhoto = false;
      }
      if (this.profileData.email === 'None') {
        this.showEmail = false;
      }
    });
  }

}
