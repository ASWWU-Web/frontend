import { Route } from "@angular/router";
import {
  AdminComponent,
  HomeComponent,
  VoteComponent,
} from "./components/elections.component";

export const ElectionRoutes: Route[] = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "vote",
    component: VoteComponent,
  },
  {
    path: "admin",
    component: AdminComponent,
  },
];
