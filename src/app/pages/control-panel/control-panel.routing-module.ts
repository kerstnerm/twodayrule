import {RouterModule} from "@angular/router";
import {ControlPanelComponent} from "./control-panel.component";
import {NgModule} from "@angular/core";
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CreateUpdateHabitComponent} from "../create-update-habit/create-update-habit.component";
import {DetailsHabitComponent} from "../details-habit/details-habit.component";
import {ChartStatisticsComponent} from "../chart-statistics/chart-statistics.component";

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
      {
        path: 'habits/create',
        component: CreateUpdateHabitComponent
      },
      {
        path: 'habits/details/:id',
        component: DetailsHabitComponent
      },
      {
        path: 'charts',
        component: ChartStatisticsComponent
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
