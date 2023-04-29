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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterHabitsByDatePipe} from "../../pipes/filter-habits-by-date.pipe";
import {IconDisplayComponent} from "../../components/icon-display/icon-display.component";
import {KnobModule} from "primeng/knob";
import {CreateUpdateHabitComponent} from "../create-update-habit/create-update-habit.component";
import {DetailsHabitComponent} from "../details-habit/details-habit.component";

@NgModule({
  declarations: [
    ControlPanelComponent,
    DashboardComponent,
    DatePickerComponent,
    HabitComponent,
    SkeletonHabitComponent,
    CreateUpdateHabitComponent,
    FilterHabitsByDatePipe,
    IconDisplayComponent,
    DetailsHabitComponent
  ],
  imports: [
    CommonModule,
    ControlPanelRoutingModule,
    FontAwesomeModule,
    TippyDirective,
    FormsModule,
    ReactiveFormsModule,
    KnobModule
  ]
})
export class ControlPanelModule { }
