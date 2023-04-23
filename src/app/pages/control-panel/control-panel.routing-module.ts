import {RouterModule} from "@angular/router";
import {ControlPanelComponent} from "./control-panel.component";
import {NgModule} from "@angular/core";
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {LoginComponent} from "../auth/login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['/auth']);

export const routes = [
  {
    path: 'app',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuth },
    component: ControlPanelComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {path: '**', redirectTo: 'dashboard'},
    ]
  },
  { path: '**', redirectTo: 'app' },
  { path: '*', redirectTo: 'app' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlPanelRoutingModule { }
