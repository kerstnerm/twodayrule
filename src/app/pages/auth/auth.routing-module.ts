import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {redirectLoggedInTo} from "@angular/fire/auth-guard";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";

const redirectLoggedInToApp = () => redirectLoggedInTo(['/app']);

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToApp},
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}
