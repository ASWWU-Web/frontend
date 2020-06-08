import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'field-scroll-cards',
  templateUrl: './field-scroll-cards.component.html',
  styleUrls: ['./field-scroll-cards.component.css']
})

export class FieldScrollCardsComponent implements OnChanges {
  @Input() requestData: any;
  @Input() searchKey: string;
  @Input() sort: boolean = false;
  uniqueID: string = Math.random().toString(36).substr(2, 9);

  ngOnChanges() {
    // sort data based on searchKey
    if (this.requestData != null && this.sort) {
      this.requestData = this.requestData.sort((a, b) => {
        if(a[this.searchKey] < b[this.searchKey]) return -1;
        if(a[this.searchKey] > b[this.searchKey]) return 1;
        return 0;
      });
    }
  }

  scroll(negative) {
    // only scroll one card if on mobile
    let scrollNum = 2;
    if (window.innerWidth < 768) {
      scrollNum = 1;
    }
    // get card widths
    let cardWidth = 0;
    try {
      cardWidth = document.getElementById('0-' + this.uniqueID).offsetWidth;
    } catch(err) {
      return
    }
    let scroller = document.getElementById('scrolling-wrapper-' + this.uniqueID)
    let scrollVal = 0
    // jump to assumed card
    if (!negative) {
      if (scroller.scrollLeft % cardWidth < cardWidth / 2) {
        scrollVal += cardWidth * scrollNum;
      } else {
        scrollVal += cardWidth * (scrollNum + 1);
      }
    } else {
      if (scroller.scrollLeft % cardWidth < cardWidth / 2) {
        scrollVal -= cardWidth * scrollNum;
      } else {
        scrollVal -= cardWidth * (scrollNum - 1);
      }
    }
    scrollVal -= (scroller.scrollLeft % cardWidth);
    scroller.scrollBy({left: scrollVal, behavior: 'smooth'})
  }
}
