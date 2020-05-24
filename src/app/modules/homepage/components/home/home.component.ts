import { Component, OnInit, ElementRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import { HermesService } from '../../../../../shared-ng/services/services';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bgLink = 'https://aswwu.com/media/images/background/background.jpg';
  bgLinkChanged = 'url(' + this.bgLink + ')';
  showMessages = 0;

  messages = [
    "Did you ever hear the tragedy of Matthew Ma The Enbugger?",
    "No?",
    "I thought not. It's not a story the developer community would tell you. It's a hacker legend. Matthew Ma was a bug creator of the highest order, so reckless and wise he would spam \"git push --force\" to force his bugs into the working commits... He had such a knowledge of the dark side, he could prevent his changes from being undone.",
    "He could actually save his bugs from erasure?",
    "The dark side of the git is a pathway to many abilities some consider to be unnatural.",
    "What happened to him?",
    "He became so glitchy… the only place he remained real was in his ability to generate the ultimate bug, which eventually, of course, he did. Unfortunately, he placed comments throughout his code, so other developers could wipe out his progress during his sleep. Ironic. He could save others' bugs from death, but not his own.",
    "Is it possible to learn this power?",
    "Only from his Github Repo."
  ];

  constructor(private hermesService: HermesService, private elementRef: ElementRef) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    // hides header and subnav bar
    hermesService.sendShowHeader(false);
    hermesService.sendShowSubNav(false);
   }

   setMessage(message) {
     console.log(message)
     this.showMessages = Math.max(message,this.showMessages);
   }

  ngOnInit() { }
}
