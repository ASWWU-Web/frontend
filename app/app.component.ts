import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <!-- Borders  -->
    <div id="border1" class="side"></div>
    <div id="border2" class="side"></div>
    <navbar></navbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})

export class AppComponent {

}
