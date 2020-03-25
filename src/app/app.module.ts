import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  HomeComponent,
  SubmitComponent,
  NewSubmitComponent,
  DoneComponent,
  AdminComponent,
  AdminCreateComponent,
  AdminEditComponent,
  AdminReviewComponent,
  AdminReviewApplicationComponent,
} from './routes/routes';

import { CardListComponent } from './shared/shared-components';

import {
  // FileSelectDirective
  FileUploadModule
} from 'ng2-file-upload';

// shared-ng

import {
  SharedNgContainerComponent,
  FooterComponent,
  NavBarComponent,
  UserBubbleComponent,
  HeaderComponent
} from '../shared-ng/components/components';
import {
  RequestService, AuthService, HermesService
} from '../shared-ng/services/services';

@NgModule({
  declarations: [
    SharedNgContainerComponent,
    FooterComponent,
    NavBarComponent,
    UserBubbleComponent,
    HeaderComponent,
    AppComponent,
    HomeComponent,
    SubmitComponent,
    NewSubmitComponent,
    DoneComponent,
    AdminComponent,
    AdminCreateComponent,
    AdminEditComponent,
    AdminReviewComponent,
    AdminReviewApplicationComponent,
    // FileSelectDirective,
    CardListComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FileUploadModule
  ],
  providers: [
    RequestService,
    AuthService,
    HermesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
