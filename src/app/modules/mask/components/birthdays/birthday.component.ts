import { Subscription } from "rxjs";
import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HermesService } from "../../../../../shared-ng/services/services";

@Component({
  template: `
    <div class="container">
      <h2 class="text-white">Today's Birthdays</h2>
      <search-results
        [query]="queryToday"
        [noResultsPrompt]="'No birthdays!'"
        [noResultsJust]="'left'"
      ></search-results>
      <h2 class="text-white">Tomorrow's Birthdays</h2>
      <search-results
        [query]="queryTomorrow"
        [noResultsPrompt]="'No birthdays!'"
        [noResultsJust]="'left'"
      ></search-results>
      <h2 class="text-white">This Week's Birthdays</h2>
      <search-results
        [query]="queryWeek"
        [noResultsPrompt]="'No birthdays!'"
        [noResultsJust]="'left'"
      ></search-results>
    </div>
  `,
})
export class BirthdayComponent implements OnInit {
  queryToday: string;
  queryTomorrow: string;
  queryWeek: string;
  private subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private hermesService: HermesService,
  ) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "black";
    // displays header and subnav bar
    hermesService.sendShowHeader(true);
    hermesService.sendShowSubNav(true);
  }

  ngOnInit() {
    // today's birthdays
    const d = new Date();
    this.queryToday =
      "birthday=" +
      ("0" + (d.getMonth() + 1)).substr(-2) +
      "-" +
      ("0" + d.getDate()).substr(-2);

    // tomorrow's birthdays
    d.setDate(d.getDate() + 1);
    this.queryTomorrow =
      "birthday=" +
      ("0" + (d.getMonth() + 1)).substr(-2) +
      "-" +
      ("0" + d.getDate()).substr(-2);

    // rest of the week's birthdays
    this.queryWeek = "birthday=";
    for (let i = 0; i < 6; i++) {
      d.setDate(d.getDate() + 1);
      this.queryWeek +=
        ("0" + (d.getMonth() + 1)).substr(-2) +
        "-" +
        ("0" + d.getDate()).substr(-2);
      if (i < 5) {
        this.queryWeek += ",";
      }
    }
  }
}
