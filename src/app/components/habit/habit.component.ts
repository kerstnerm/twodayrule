import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Habit} from "../../models/habit";
import * as dayjs from "dayjs";
import {HabitService} from "../../services/habit.service";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {take} from "rxjs";
import {debounce} from "../../decorators/debounce";

@Component({
  selector: 'app-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss']
})
export class HabitComponent implements OnInit, OnChanges {
  faCheck = faCheck;
  @Input() habit: Habit | undefined;
  @Input() selectedDate: string | undefined;
  currentValue = 0;
  todayDate: string | undefined;
  @Output() updateHabit = new EventEmitter<Habit>();

  constructor(private habitService: HabitService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.habit && this.selectedDate) {
      this.calculateCurrentValueBySelectedDate();
    }
  }

  ngOnInit(): void {
    this.todayDate = dayjs().format('YYYY-MM-DD');
  }

  private calculateCurrentValueBySelectedDate() {
    const selectedDateHistory = this.habit?.history.filter(item => dayjs(item.date.toDate()).format('YYYY-MM-DD') === this.selectedDate);
    let currentValue = 0;
    selectedDateHistory?.forEach(history => {
      currentValue += history.value;
    })
    this.currentValue = currentValue;
  }

  @debounce(200)
  increaseCurrentValue() {
    if (this.habit) {
      const history = this.habit.history || [];
      const newHistoryItem = {
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        value: 1
      };
      history.push(newHistoryItem);
      this.habit.history = history;
      this.calculateCurrentValueBySelectedDate();
      this.updateHabit.emit(this.habit);
    }
  }
}
