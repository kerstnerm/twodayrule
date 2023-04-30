import {Component, Input} from '@angular/core';
import {Habit} from "../../models/habit";

@Component({
  selector: 'app-habit-title',
  templateUrl: './habit-title.component.html',
  styleUrls: ['./habit-title.component.scss']
})
export class HabitTitleComponent {
  @Input() habit: Habit | undefined;
}
