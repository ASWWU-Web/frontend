import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CountdownRoutes } from "./countdown.routes";
import { HermesService } from "src/shared-ng/services/hermes.service";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(CountdownRoutes),
  ],
  providers: [HermesService, provideHttpClient(withInterceptorsFromDi())],
  exports: [],
})
export class CountdownModule {}
