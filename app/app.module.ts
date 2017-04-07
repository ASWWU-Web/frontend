import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';
import { NgbModule }     from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { SubmitComponent } from './routes/submit/submit.component';
import { DoneComponent } from './routes/done/done.component';
import { AdminComponent } from './routes/admin/admin.component';
import { AdminCreateComponent } from './routes/admin/create/admin-create.component';
import { AdminEditComponent } from './routes/admin/edit/admin-edit.component';
import { AdminReviewComponent } from './routes/admin/review/admin-review.component';
import { AdminReviewApplicationComponent } from './routes/admin/review-application/admin-review-application.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'submit/:formID',
        component: SubmitComponent
      },
      {
        path: 'done/:formID',
        component: DoneComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'admin/create',
        component: AdminCreateComponent
      },
      {
        path: 'admin/edit/:ID',
        component: AdminEditComponent
      },
      {
        path: 'admin/review/:formID',
        component: AdminReviewComponent
      },
      {
        path: 'admin/review/:formID/:username',
        component: AdminReviewApplicationComponent
      },
    ]),
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SubmitComponent,
    DoneComponent,
    AdminComponent,
    AdminCreateComponent,
    AdminEditComponent,
    AdminReviewComponent,
    AdminReviewApplicationComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
