import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlPanelComponent} from "./control-panel.component";
import {ControlPanelRoutingModule} from "./control-panel.routing-module";
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    ControlPanelComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ControlPanelRoutingModule
  ]
})
export class ControlPanelModule { }
