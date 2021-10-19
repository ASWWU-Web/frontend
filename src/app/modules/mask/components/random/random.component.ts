/**
 * Created by ethan on 2/21/17.
 */
import { Component, OnInit, ElementRef } from '@angular/core';
import { delay } from 'rxjs/operators';
import { MaskRequestService, HermesService } from '../../../../../shared-ng/services/services';
import { ProfileModel } from '../../profile.model';
import { CURRENT_YEAR } from '../../../../../shared-ng/config';

@Component({
    template:  `
    <div class="container">
      <h2 class="text-white" style="margin-top: 40px">Random</h2>
      <button (click)="getRandom()" class="btn btn-primary">Get new random profile</button>
      <div style="margin-top: 40px">
          <profile-full *ngIf="!isLoading" [profile]='selectedProfile'></profile-full>
          <h1 *ngIf="isLoading" style="text-transform: capitalize !important; color: white; text-align: center">LOADING</h1>
      </div>
    </div>
  `,
    providers: [
    ],
})

export class RandomComponent implements OnInit {
    allProfiles: any;
    selectedProfile: any;
    isLoading: boolean = true;

    constructor(private mrs: MaskRequestService, private elementRef: ElementRef, private hermesService: HermesService) {
      // sets background color
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
      // displays header and subnav bar
      hermesService.sendShowHeader(true);
      hermesService.sendShowSubNav(true);
    }

    ngOnInit() {
      const profileObservable = this.mrs.listProfile();
      profileObservable.subscribe((data) => {
        this.allProfiles = data;
        this.getRandom();
      }, undefined);
    }

    getRandom(): any {
        this.isLoading = true;
        let random = Math.floor((Math.random() * (this.allProfiles.length)));
        let newProfile = this.allProfiles[random];
        while (newProfile['photo'] === 'images/mask_unknown.png' || newProfile['photo'] === 'None' ||
               !newProfile['photo']) {
          random = Math.floor((Math.random() * (this.allProfiles.length)));
          newProfile = this.allProfiles[random];
        }
        const profileObservable = this.mrs.readProfile(CURRENT_YEAR, newProfile['username']);
        profileObservable.pipe(delay(500)).subscribe(data => {
          this.selectedProfile = new ProfileModel(data);
          this.isLoading = false;
        }, undefined);
    }

}
