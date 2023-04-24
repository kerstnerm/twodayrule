import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Habit} from "../../models/habit";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss']
})
export class HabitComponent implements OnChanges {
  faCheck = faCheck;
  @Input() habit: Habit | undefined;
  @Input() selectedDate: string | undefined;
  currentValue = 0;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.habit && this.selectedDate) {
      this.calculateCurrentValueBySelectedDate();
    }
  }

  ngOnInit(): void {
    console.log(this.habit);
  }

  private calculateCurrentValueBySelectedDate() {
    const selectedDateHistory = this.habit?.history.filter(item => {
      const itemDate = item.date.toDate();
      return dayjs(itemDate).format('YYYY-MM-DD') === this.selectedDate
    })
    let currentValue = 0;
    selectedDateHistory?.forEach(history => {
      currentValue += history.value;
    })
    this.currentValue = currentValue;
  }
}
