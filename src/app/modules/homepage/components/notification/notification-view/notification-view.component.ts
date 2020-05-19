import { Component, OnInit } from '@angular/core';
import {Notification} from "../../../../../../shared-ng/interfaces/homepage";
import {NotificationRequestService} from "../../../../../../shared-ng/services/notification.request.service";

@Component({
  selector: 'notifications',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.css']
})
export class NotificationViewComponent implements OnInit {

  constructor(private nrs: NotificationRequestService) { }

  severityOptions = {
    1: "alert-primary",
    2: "alert-secondary",
    3: "alert-danger",
  }

  notifications: Notification[];

//  notifications = [
//    {
//      notification_text: "stuff here",
//      notification_link: "google.com",
//      start_time: "2020-05-18 17:31:00.0",
//      end_time: "2020-05-19 17:31:00.0",
//      visibility: 1,
//      severity: 1,
//    },
//    {
//      notification_text: "stuff here 2.0",
//      notification_link: "abc.com",
//      start_time: "2020-05-18 17:31:00.0",
//      end_time: "2020-05-19 17:31:00.0",
//      visibility: 1,
//      severity: 2,
//    },
//    {
//      notification_text: "stuff here 3.0",
//      notification_link: "abc.com",
//      start_time: "2020-05-18 17:31:00.0",
//      end_time: "2020-05-19 17:31:00.0",
//      visibility: 1,
//      severity: 3,
//    },
//  ];


  ngOnInit() {
    this.nrs.listNotifications({visible: 1}).subscribe(data => {
      this.notifications = data;
    }, error => {}, () => {});
  }

}
