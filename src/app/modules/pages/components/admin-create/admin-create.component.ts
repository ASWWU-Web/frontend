import { Component, OnInit, NgModule, ElementRef } from '@angular/core';
import { RequestService, HermesService } from '../../../../../shared-ng/services/services';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {

  newPage: any = {};
  categories: any;
  departments: any;

  urlIsEdited = false;
  regex = /[^a-z0-9-]/;
  regexGlobal = /[^a-z0-9-]/g;
  urlInvalid = false;

  constructor( private rs: RequestService, private router: Router, private hs: HermesService, private elementRef: ElementRef ) {  
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  onSubmit() {
    if (!this.urlInvalid) {
      this.rs.post( ('/pages/admin'), this.newPage).subscribe(
        (data) => {
          if ( data.status !== undefined ) {
            if (data.status === 'page created') {
              this.router.navigate(['admin/edit' , this.newPage.url ]);
            } else {
              alert(data.status);
            }
          } else {
            alert( 'Unable to connect' );
          }
        },
        (error) => {
          console.log(error);
            if (error.status === 409) {
              alert( 'The URL you\'ve selected is already in use' );
            } else {
              alert( error.message + '\n' + error.statusText );
            }
        }
      );
    } else {
      alert('The URL you entered is invalid.\nUse only lowercase alphanumeric characters and hyphens.');
    }
  }

  titleEdit () {
    if (!this.urlIsEdited) {
      const titleBasedUrl = this.newPage.title.toLowerCase().replace(/ /g, '-').replace(this.regexGlobal, '');
      this.newPage.url = titleBasedUrl;
    }
  }

  urlEdit() {
    this.urlIsEdited = true;
    // GC -- Is it bad to have this set urlIsEdited on every keyup?
    // GC -- I'm not sure how I'd do it on just the first keyup and it seems spammy to do it on every single one.
    this.urlCheck();
  }

  urlCheck() {
    this.urlInvalid = this.regex.test(this.newPage.url);
  }

  ngOnInit() {
    this.rs.get( ('/pages/categories')).subscribe((data) => this.categories = data.categories);
    this.rs.get( ('/pages/departments')).subscribe((data) => this.departments = data.departments);
    this.hs.sendHeaderTitle('Create');
  }

}
