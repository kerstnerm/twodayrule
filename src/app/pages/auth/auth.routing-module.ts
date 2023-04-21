import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";

export const routes = [
  {
    path: '',
    component: AuthComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
