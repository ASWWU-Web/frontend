import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from "../shared-ng/components/error-page/error-page.component";

const routes: Routes = [
  // at some point I'll redesign the home page to be a landing page...
  // TODO: riley
  {
    path: "",
    redirectTo: "/mask",
    pathMatch: "full",
  },
  {
    path: "mask",
    loadChildren: () =>
      import("./modules/mask/mask.module").then((m) => m.MaskModule),
  },
  {
    path: "**",
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
