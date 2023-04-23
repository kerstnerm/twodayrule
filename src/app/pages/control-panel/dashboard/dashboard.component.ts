import { Component } from '@angular/core';
import * as dayjs from "dayjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  date: string;

  constructor() {
    this.date = dayjs().format('YYYY-MM-DD HH:mm')
  }

}
