import { Component, ElementRef, OnInit } from "@angular/core";
import {
  AuthService,
  ElectionsRequestService,
} from "../../../../../shared-ng/services/services";
import { Router } from "@angular/router";
import momentTz from "moment-timezone";
import moment from "moment";
import { User } from "src/shared-ng/interfaces/interfaces";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  status: string;
  admin: boolean;

  // User roles
  roles = [""];
  response = null;
  isLoggedIn = false;
  router: any;
  dates = null;

  senate_candidates: {
    username: string;
    photoURL: string;
    full_name: string;
    district: string;
  }[] = [
    {
      username: "John.Griffin",
      photoURL: "profiles/1920/9_12_2021-2070528.jpeg",
      full_name: "JC Griffin",
      district: "District 1",
    },
    {
      username: "Benjamin.Griffin",
      photoURL: "profiles/1920/04-26-2021-119-2054216.jpg",
      full_name: "Ben Griffin",
      district: "District 1",
    },
    {
      username: "Daniel.Rood",
      photoURL: "images/default_mask/default.jpg",
      full_name: "Daniel Rood",
      district: "District 2",
    },
    {
      username: "Gabriel.Rouse",
      photoURL: "profiles/1920/9_12_2021-2046156.jpeg",
      full_name: "Gabe Rouse",
      district: "District 2",
    },
    {
      username: "Hector.Ruvalcaba",
      photoURL: "images/default_mask/default.jpg",
      full_name: "Hector Ruvalcaba",
      district: "District 2",
    },
    {
      username: "Jeffrey.Fennell",
      photoURL: "profiles/1819/01771-2038119.jpg",
      full_name: "Jeffrey Fennell",
      district: "District 2",
    },
    {
      username: "Keagan.Griffin",
      photoURL: "images/default_mask/default.jpg",
      full_name: "Keagan Griffin",
      district: "District 2",
    },
    {
      username: "Josie.Tkachuck",
      photoURL: "profiles/1920/03-02-2021-333-2059256.jpg",
      full_name: "Josie Tkachuck",
      district: "District 3",
    },
    {
      username: "Lauren.Vizcarra",
      photoURL: "images/default_mask/default.jpg",
      full_name: "Lauren Vizcarra",
      district: "District 3",
    },
    {
      username: "Natasha.Mwansa",
      photoURL: "profiles/1920/9_12_2021-2075762.jpeg",
      full_name: "Natasha Mwansa",
      district: "District 4",
    },
    {
      username: "Lauren.Trautwein",
      photoURL: "profiles/1920/03-02-2021-265-2071358.jpg",
      full_name: "Lauren Trautwein",
      district: "District 4",
    },
    {
      username: "Havilah.Reimche-Vu",
      photoURL: "profiles/1920/03-02-2021-127-2071360.jpg",
      full_name: "Havilah Reimche-Vu",
      district: "District 4",
    },
    {
      username: "Brendon.Griffin",
      photoURL: "profiles/1920/03-02-2021-203-2049076.jpg",
      full_name: "Brendon Griffin",
      district: "District 5",
    },
    {
      username: "Hayden.Sherrill",
      photoURL: "profiles/1920/03-02-2021-186-2025015.jpg",
      full_name: "Hayden Sherrill",
      district: "District 5",
    },
    {
      username: "Annaliese.Grellmann",
      photoURL: "profiles/1920/03-02-2021-278-2030714.jpg",
      full_name: "Annaliese Grellman",
      district: "District 6",
    },
    {
      username: "Jacob.Roney",
      photoURL: "images/default_mask/default.jpg",
      full_name: "Jacob Roney",
      district: "District 6",
    },
    {
      username: "Scott.Neil",
      photoURL: "images/default_mask/default.jpg",
      full_name: "River Neil",
      district: "District 7",
    },
    {
      username: "Chloe.RolleRoda",
      photoURL: "profiles/1920/136-2071085.jpg",
      full_name: "Chloe Roda",
      district: "District 7",
    },
  ];

  constructor(
    private ers: ElectionsRequestService,
    private as: AuthService,
    private _router: Router,
    private elementRef: ElementRef,
  ) {
    this.router = _router;
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "white";
  }

  ngOnInit() {
    // verify the user is logged in
    this.as.getUserInfo().subscribe((data: User) => {
      this.isLoggedIn = data ? true : false;
    });
    this.isLoggedIn = this.as.isLoggedIn();
    // setup election options on landing page
    this.getCurrentElectionOptions();
    // check if the user is an admin
    if (this.roles.indexOf("admin") > -1) {
      this.admin = true;
    }
  }

  // Makes get request to elections/current to set up information for homepage
  getCurrentElectionOptions() {
    const electionsObservable = this.ers.readElectionCurrent();
    electionsObservable.subscribe(
      (data) => {
        this.response = data;

        const serverTimeZone = "America/Los_Angeles";
        const dateFormat = "YYYY-MM-DD HH:mm:ss.SSSS";
        const localTimeZone = momentTz.tz.guess();

        const startDate = momentTz.tz(this.response["start"], serverTimeZone);
        startDate.tz(localTimeZone);
        const endDate = momentTz.tz(this.response["end"], serverTimeZone);
        endDate.tz(localTimeZone);

        const localNow = momentTz.tz(
          momentTz(moment(), dateFormat).tz(localTimeZone).format(dateFormat),
          dateFormat,
          localTimeZone,
        );

        this.dates = {};

        this.dates["start"] = startDate;
        this.dates["end"] = endDate;
        this.dates["now"] = localNow;

        if (startDate > this.dates["now"]) {
          this.status = "upcoming";
        } else {
          this.status = "now";
        }
      },
      (error) => {
        this.status = "none";
      },
    );
  }

  getDateTime(datetime) {
    const date = new Date(datetime);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }
}
