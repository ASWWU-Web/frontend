import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestService as OLD_RS} from './RequestService/requests';

import {
  HomeComponent,
  SubmitComponent,
  DoneComponent,
  AdminComponent,
  AdminCreateComponent,
  AdminEditComponent,
  AdminReviewComponent,
  AdminReviewApplicationComponent,
} from './routes/routes';

import {
  NavbarComponent,
} from './shared/navbar.component';

import {
  FileSelectDirective
} from 'ng2-file-upload';

// shared-ng

import {
  SharedNgContainerComponent,
  FooterComponent,
  NavBarComponent,
  MobileNavComponent,
  UserBubbleComponent,
  HeaderComponent
} from '../shared-ng/components/components';
import {
  RequestService
} from '../shared-ng/services/services';

@NgModule({
  declarations: [
    SharedNgContainerComponent,
    FooterComponent,
    NavBarComponent,
    MobileNavComponent,
    UserBubbleComponent,
    HeaderComponent,
    AppComponent,
    HomeComponent,
    SubmitComponent,
    DoneComponent,
    AdminComponent,
    AdminCreateComponent,
    AdminEditComponent,
    AdminReviewComponent,
    AdminReviewApplicationComponent,
    NavbarComponent,
    FileSelectDirective
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    RequestService,
    OLD_RS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
