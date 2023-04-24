import { Component } from '@angular/core';
import {faCheck, faInfo} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss']
})
export class HabitComponent {
  faCheck = faCheck;
  faInfo = faInfo;
}
