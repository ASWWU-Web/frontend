import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'page-scroll-cards',
  templateUrl: './page-scroll-cards.component.html',
  styleUrls: ['./page-scroll-cards.component.css']
})

export class PageScrollCardsComponent {
  @Input() requestData: any;
  @Input() showMeta: boolean;
  @Input() sort: boolean = false;
  uniqueID: string = Math.random().toString(36).substr(2, 9);

  ngOnChanges() {
    // sort data based on title
    if (this.requestData != null && this.sort) {
      this.requestData = this.requestData.sort((a, b) => {
        if(a['title'] < b['title']) return -1;
        if(a['title'] > b['title']) return 1;
        return 0;
      });
    }
  }

  scroll(negative) {
    // get card widths
    let cardWidth = 0
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
        scrollVal += cardWidth * 2;
      } else {
        scrollVal += cardWidth * 3;
      }
    } else {
      if (scroller.scrollLeft % cardWidth < cardWidth / 2) {
        scrollVal -= cardWidth * 2;
      } else {
        scrollVal -= cardWidth;
      }
    }
    scrollVal -= (scroller.scrollLeft % cardWidth);
    console.log(scrollVal);
    scroller.scrollBy({left: scrollVal, behavior: 'smooth'})
  }
}
