import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestService } from './RequestService/requests';

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

@NgModule({
  declarations: [
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
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    RequestService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
