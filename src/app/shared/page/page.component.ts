import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';

import { ViewPageComponent } from '../../routes/routes';
import { BypassSecurityPipe } from '../bypassSecurityPipe';
import { RequestService, AuthService, HermesService } from '../../../shared-ng/services/services';
import { CURRENT_YEAR, MEDIA_XS, MEDIA_LG, MEDIA_MD, MEDIA_URI } from '../../config';
import { resolveCoverImage } from '../resolveCoverImage';
import { User } from '../../../shared-ng/interfaces/user';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnChanges {
  @Input() requestURL: string;

  getCoverImage: any = resolveCoverImage;
  coverImage: any;
  page: any;
  continue = true;
  owner = {
    'full_name': 'ASWWU',
    'photo': 'images/mask_unknown.png',
    'email': 'aswwu.webmaster@wallawalla.edu',
  };
  media_sm = MEDIA_XS;
  media_lg = MEDIA_LG;
  media_md = MEDIA_MD;
  media_uri = MEDIA_URI;
  MASK = 'https://aswwu.com/#/profile';
  isEditor = false;
  pageProfile: string;
  errorPage = false;
  currentUser: User;
  userInfoSubscription: Subscription;
  buildLoginLink: () => string;

  constructor( private rs: RequestService, private as: AuthService, private router: Router, private hs: HermesService) {
  }

  ngOnChanges() {
    this.buildLoginLink = this.as.buildLoginLink;
    this.userInfoSubscription = this.as.getUserInfo().subscribe((data: User) => {
      this.rs.get(this.requestURL);
      this.currentUser = data;
    });
    this.rs.get(this.requestURL).subscribe((data) => {
      this.page = data;
      this.continue = true;
      this.coverImage = resolveCoverImage(this.page.cover_image, this.media_lg);
      // this.setIsEditor();
      this.setPageProfile();
    });
  }

  goToEdit() {
    this.router.navigate(['admin/edit', this.page.url]);
  }

  // setIsEditor() {
  //   this.request.verify( (data) => this.isEditor = this.page.editors.includes(data.username) || (this.page.owner === data.username));
  // }

  setPageProfile () {
    if (this.page.author) {
      this.pageProfile = this.page.author;
    } else {
      this.pageProfile = this.page.owner;
    }
  }
}
