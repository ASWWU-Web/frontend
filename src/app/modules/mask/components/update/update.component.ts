/**
 * Created by ethan on 2/7/17.
 */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

import {
  AuthService,
  MaskRequestService,
  RequestService,
} from "../../../../../shared-ng/services/services";
import {
  ProfileFull,
  Status,
  User,
} from "../../../../../shared-ng/interfaces/interfaces";
import { FieldSections, SearchableFields, SelectFields } from "../../fields";
import {
  CURRENT_YEAR,
  DEFAULT_PHOTO,
  MEDIA_SM,
  MEDIA_URI,
} from "../../../../../shared-ng/config";
import { ProfileModel } from "../../profile.model";

@Component({
  selector: "update-profile",
  templateUrl: "update.component.html",
  styleUrls: ["update.component.css", "update.component.mobile.css"],
  providers: [],
})

/*
 * This is the component that handles a user updating their profile.
 * */
export class UpdateComponent implements OnInit {
  constructor(
    private rs: RequestService,
    private as: AuthService,
    private mrs: MaskRequestService,
    private router: Router,
  ) {}

  profile: User;
  fullProfile: ProfileModel;
  sections: string[][] = FieldSections;
  selectables = SelectFields;
  searchables = SearchableFields;
  possiblePhotos: string[];
  searchYears: string[];
  justClicked: string;
  userStatus: Status; // Student, Faculty, etc.

  /*
   * On initialization of this component, call the verify function to ensure that the user is logged in.
   * Take the returned minimal profile data and use that to query the server for the user's full profile.
   * This full profile is then set as fullProfile.
   * */
  ngOnInit() {
    this.as.authenticateUser().subscribe((data) => {
      this.profile = data;
      this.mrs
        .readProfile(CURRENT_YEAR, this.profile.username)
        .subscribe((prof) => {
          this.fullProfile = this.Decode(prof);
          this.getPhotos();
        });
    });

    this.getUserStatus();
  }

  // Typeahead major/minor functions
  searchMajors = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.searchables["majors"]
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10),
      ),
    );
  searchMinors = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.searchables["minors"]
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10),
      ),
    );

  // Because the `requestService` is private it cannot be accessed by the
  // template. Hence the reason for this function. :(
  isLoggedOn() {
    return this.as.isLoggedIn();
  }

  // This function gets the url's of all the possible photos for a user from the endpoint on the server.
  getPhotos() {
    this.possiblePhotos = [DEFAULT_PHOTO];
    this.justClicked = this.profile.photo;

    const photoObservable = this.mrs.listPhotos();
    photoObservable.subscribe((data) => {
      this.possiblePhotos = this.possiblePhotos.concat(data.photos);
    });
  }

  // Function to change which picture is set for a user. For use in the html to select a picture.
  changePhoto(url: string): void {
    this.fullProfile.photo = url;
  }

  // Get the link for a given photo
  getPhotoLink(uri: string): string {
    if (!uri || uri == "") uri = this.fullProfile.photo || DEFAULT_PHOTO;
    if (uri == DEFAULT_PHOTO) return uri;
    const photo = MEDIA_SM + uri.replace(MEDIA_URI, "").replace("//", "/");
    return photo;
  }

  // Takes url-safe strings and converts them into valid ASCII so that Javascript can handle them properly.
  // e.g. it takes a string like "peanut butter &amp; jelly" and turns it into "peanut butter & jelly"
  Decode(data: ProfileFull) {
    if (data.username !== undefined && data.username !== null) {
      let key: string;
      for (key in data) {
        if (data[key]) {
          const div = document.createElement("div");
          div.innerHTML = data[key];
          data[key] = div.firstChild.nodeValue;
        }
      }
      return new ProfileModel(data);
    } else {
      return undefined;
    }
  }

  // Lets a user upload their profile to the server.
  UploadProfile(): void {
    this.mrs
      .updateProfile(this.fullProfile.username, this.fullProfile)
      .subscribe(() => {
        // refresh the user info
        this.as.authenticateUser().subscribe();
        this.router.navigate([
          "/mask/profile",
          { username: this.fullProfile.username },
        ]);
      });
  }

  getUserStatus() {
    const authObserverable = this.as.authenticateUser();
    authObserverable.subscribe((data) => {
      this.userStatus = data.status;
    });
  }
}
