import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  /* {
    path: 'error',
    loadChildren: () => import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  }, */
  {
    path: '',
    loadChildren: () => import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule)
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
