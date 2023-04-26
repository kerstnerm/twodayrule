import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlPanelComponent} from "./control-panel.component";
import {ControlPanelRoutingModule} from "./control-panel.routing-module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {DatePickerComponent} from "../../components/date-picker/date-picker.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HabitComponent} from "../../components/habit/habit.component";
import {TippyDirective} from "@ngneat/helipopper";
import {SkeletonHabitComponent} from "../../components/skeleton-habit/skeleton-habit.component";
import {CreateHabitComponent} from "../create-habit/create-habit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularMyDatePickerModule} from "angular-mydatepicker";

@NgModule({
  declarations: [
    ControlPanelComponent,
    DashboardComponent,
    DatePickerComponent,
    HabitComponent,
    SkeletonHabitComponent,
    CreateHabitComponent
  ],
  imports: [
    CommonModule,
    ControlPanelRoutingModule,
    FontAwesomeModule,
    TippyDirective,
    FormsModule,
    AngularMyDatePickerModule,
    ReactiveFormsModule
  ]
})
export class ControlPanelModule { }
