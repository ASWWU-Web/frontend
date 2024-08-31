import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

// shared-ng components
import {
  ContentModerationComponent,
  ErrorPageComponent,
  FooterComponent,
  HeaderComponent,
  NavBarComponent,
  SharedNgContainerComponent,
  UploadModalComponent,
  UserBubbleComponent
} from '../shared-ng/components/components';
import {
  AuthService,
  HermesService,
  RequestService,
  UrlService
} from '../shared-ng/services/services';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';


@NgModule({ declarations: [
        AppComponent,
        NavBarComponent,
        FooterComponent,
        HeaderComponent,
        UserBubbleComponent,
        SharedNgContainerComponent,
        ErrorPageComponent,
        UploadModalComponent,
        ContentModerationComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FontAwesomeModule,
        NgbModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-left'
        })], providers: [
        RequestService,
        HermesService,
        AuthService,
        UrlService,
        NgbActiveModal,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch);
  }
}
