import {RouterModule} from "@angular/router";
import {WelcomeComponent} from "./welcome.component";
import {NgModule} from "@angular/core";

export const routes = [
  {
    path: 'app',
    component: WelcomeComponent
  },
  { path: '**', redirectTo: 'app' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule { }
