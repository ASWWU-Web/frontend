import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MEDIA_SM, DEFAULT_PHOTO, CURRENT_YEAR } from '../../../../../shared-ng/config';
import { RequestService } from '../../../../../shared-ng/services/services';

@Component({
  selector: 'profile-sm',
  templateUrl: 'profile-sm.component.html',
  styleUrls: [ 'profile-sm.styles.css' ],
  inputs: ['searchResult']
})


export class ProfileSmComponent {
  link: string = "";

  constructor(private rs: RequestService) {}

  ngOnInit() {
    this.link = this.getPhotoLinkSync(this.searchResult.photo);
    this.getPhotoLinkAsync(this.searchResult.photo)
      .then((link: string) => this.link = link);
  }

  @Input() searchResult: any;
  @Input('year') year: String = undefined;
  current_year = CURRENT_YEAR;

  // Photo url to link function returns proper url and BLANK photo if photo == "None"
  getPhotoLinkSync(url: string) {    
    var link = "";
    if (url && url != 'None') {
      link = MEDIA_SM + '/' + url;
    } else {
      link = MEDIA_SM + '/' + DEFAULT_PHOTO;
    }
    return link;
  }
  // Photo url to link function returns proper url and BLANK photo if photo == "None"
  getPhotoLinkAsync(url: string) {
    return new Promise((resolve, reject) => {      
      var link = this.getPhotoLinkSync(url);
      
      this.rs.get(link).subscribe(
          (data: any) => {
          resolve(link);
        },
        (response: HttpErrorResponse) => { // why does requesting an image resource always respond with error?
          if (response.status == 415) {
            link = MEDIA_SM + '/' + DEFAULT_PHOTO;
            resolve(link);
          } else if (response.status == 200) {
            resolve(link);
          } else {
            reject(response);
          }
        }
      )
    })
  }
}
