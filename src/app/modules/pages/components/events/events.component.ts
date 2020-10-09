import { Component } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { RequestService, HermesService } from '../../../../../shared-ng/services/services';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  events: any;

  constructor(private rs: RequestService, private route: ActivatedRoute, private router: Router,
              private hs: HermesService) {
    this.rs.get('/pages/search?category=Event').subscribe((data) => {
      this.events = data.results.reverse();
    });

    this.hs.sendShowHeader(true);
    this.hs.sendHeaderTitle('Events');
    this.hs.sendHeaderImageUri('../../../assets/events.jpg');
    this.hs.sendShowSubNav(true);
    this.hs.sendHeaderInvert(true);
  }
}
