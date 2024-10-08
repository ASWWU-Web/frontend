/**
 * Created by ethan on 1/18/17.
 */
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { MaskRequestService } from "../../../../../shared-ng/services/services";

import { ProfileModel } from "../../profile.model";
import {
  CURRENT_YEAR,
  MEDIA_MD,
} from "../../../../../shared-ng/config";

@Component({
  selector: "test-profile",
  template: `
    <div class="container" style="margin-top: 40px">
      <profile-full [profile]="profile"></profile-full>
    </div>
  `,
  providers: [],
})
export class ProfileComponent implements OnInit {
  username: string;
  year: string = CURRENT_YEAR;
  profile: ProfileModel;
  private subscription: Subscription;

  constructor(
    private mrs: MaskRequestService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe((param: any) => {
      // param name specified in the app.module.ts file.
      this.username = param["username"];
      this.year = param["year"] ? param["year"] : CURRENT_YEAR;
      const profileObservable = this.mrs.readProfile(this.year, this.username);
      profileObservable.subscribe((data) => {
        this.profile = new ProfileModel(data, this.year);
      });
    });
  }
}
