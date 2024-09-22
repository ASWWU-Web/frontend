import { Component, Input, OnInit } from "@angular/core";

interface Card {
  image: string;
  color: string;
  title: string;
  subTitle: string;
  body: string;
  buttonText: string;
  buttonLink: string;
}

@Component({
  selector: "card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.css"],
})
export class CardListComponent implements OnInit {
  @Input() cards: Card[] = [];

  constructor() {}

  ngOnInit() {}
}
