import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService, HermesService } from '../../../shared-ng/services/services';
import { resolveCoverImage } from '../../shared/resolveCoverImage';
import { MEDIA_LG } from '../../config';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {
  pageURL: string;
  page: any;
  coverImage: any;
  getCoverImage: any = resolveCoverImage;
  media_lg = MEDIA_LG;

  constructor( private route: ActivatedRoute, private rs: RequestService, private hs: HermesService) {
    this.route.params.subscribe( (params) => this.pageURL = params.pageURL );
    this.rs.get('/pages/' + this.pageURL).subscribe((data) => {
      this.page = data;
      this.coverImage = resolveCoverImage(this.page.cover_image, this.media_lg);
      this.hs.sendShowHeader(true);
      this.hs.sendHeaderInvert(false);
      this.hs.sendHeaderTitle(this.page.title);
      this.hs.sendHeaderImageUri(this.coverImage);
      this.hs.sendShowSubNav(true);
    });
  }

  ngOnInit() {
  }

}
