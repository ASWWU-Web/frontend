import {Component, NgModule} from '@angular/core';
import { RouterLink } from '@angular/router';

import { MEDIA_SM, DEFAULT_PHOTO, CURRENT_YEAR } from '../../shared-ng/config';
import { RequestService, AuthService } from 'src/shared-ng/services/services';
import { asElementData } from '@angular/core/src/view';


@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.styles.css'],
  providers: [ RequestService ]
})

export class NavbarComponent {
  currentUser: any;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor( private rs: RequestService, private as: AuthService ) {
    as.authenticateUser().subscribe(
      (user) => {
        if(user) {
          this.isLoggedIn = true;
          this.currentUser = user;
          if(this.currentUser.roles.includes("forms")) {
            this.isAdmin = true;
          }
        }
      });
  }

  getPhotoLink(url: string){
    if(url && url != "None"){
      return MEDIA_SM + "/" + url;
    } else {
      return MEDIA_SM + "/" + DEFAULT_PHOTO;
    }
  }

  displayUserOptions(): void{
  }

  logout(): void {
    this.as.logout();
    this.currentUser = undefined;
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
