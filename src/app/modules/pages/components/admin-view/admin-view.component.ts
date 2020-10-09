import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  pageURL: string;

  constructor( private route: ActivatedRoute ) {
    this.route.params.subscribe( (params) => this.pageURL = params.pageURL );
   }

  ngOnInit() {
  }

}
