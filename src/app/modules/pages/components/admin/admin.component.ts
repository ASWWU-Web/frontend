import { Component, OnInit, ElementRef } from '@angular/core';
import { RequestService, HermesService } from '../../../../../shared-ng/services/services';
import { Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ RequestService ]
})
export class AdminComponent implements OnInit {

  admin: any = [];

  constructor( private rs: RequestService, private hs: HermesService, private router: Router, private elementRef: ElementRef ) { 
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  ngOnInit() {
    this.hs.sendHeaderTitle('Admin');
    this.hs.sendShowHeader(true);
    this.hs.sendShowSubNav(true);
    this.rs.get( ('/pages/admin')).subscribe((data) => this.admin = data.results);
  }

  shorten( text: string ) {
    if (text) {
      if (text.length > 20) {
        return text.slice(0, 20) + '...';
      } else {
        return text;
      }
    } else {
      return '';
    }
  }

  createNew() {
    this.router.navigate(['/admin/create']);
  }

}
