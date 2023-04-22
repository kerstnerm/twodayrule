import {RouterModule} from "@angular/router";
import {WelcomeComponent} from "./welcome.component";
import {NgModule} from "@angular/core";
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['/auth']);

export const routes = [
  {
    path: 'app',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuth },
    component: WelcomeComponent
  },
  { path: '**', redirectTo: 'app' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule { }
