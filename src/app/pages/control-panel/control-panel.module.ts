import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlPanelComponent} from "./control-panel.component";
import {ControlPanelRoutingModule} from "./control-panel.routing-module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {DatePickerComponent} from "../../components/date-picker/date-picker.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HabitComponent} from "../../components/habit/habit.component";

@NgModule({
  declarations: [
    ControlPanelComponent,
    DashboardComponent,
    DatePickerComponent,
    HabitComponent
  ],
  imports: [
    CommonModule,
    ControlPanelRoutingModule,
    FontAwesomeModule
  ]
})
export class ControlPanelModule { }
