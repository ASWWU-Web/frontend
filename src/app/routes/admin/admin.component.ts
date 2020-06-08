import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../shared-ng/services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin: any = [];

  constructor( private rs: RequestService, private router: Router ) {  }

  ngOnInit() {
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
    this.router.navigate(['admin/create']);
  }

}
