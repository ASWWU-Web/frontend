import { Component, OnInit } from '@angular/core';
import {Notification} from "../../../../../../shared-ng/interfaces/homepage";
import {NotificationRequestService} from "../../../../../../shared-ng/services/notification.request.service";

@Component({
  selector: 'app-notification-admin',
  templateUrl: './notification-admin.component.html',
  styleUrls: ['./notification-admin.component.css']
})
export class NotificationAdminComponent implements OnInit {

  constructor(private nrs: NotificationRequestService) { }

  notifications: Notification[];

  ngOnInit() {
    this.nrs.listNotifications({visible: 1}).subscribe(data => {
      this.notifications = data;
    }, error => {}, () => {});
  }

}
