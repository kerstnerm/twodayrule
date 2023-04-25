import {Component, OnInit} from '@angular/core';
import * as dayjs from "dayjs";
import {HabitService} from "../../../services/habit.service";
import {delay, Observable, take, tap} from "rxjs";
import {Habit} from "../../../models/habit";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  selectedDate: string | undefined;
  habits$: Observable<Habit[]> | undefined;
  habitsArray: Habit[] | undefined;

  constructor(private habitService: HabitService) {
  }

  ngOnInit(): void {
    /* this.habitService.getHabits().subscribe((res) => {
      console.log(res);
      // @ts-ignore
      console.log('date', res[0].startDate.toDate())
      // this.habitService.setHabit({data: res}).subscribe();
    }) */

    this.habits$ = this.habitService.getHabits().pipe(
      tap(res => {
        this.habitsArray = res;
      }),
      delay(500)
    );
  }

  selectDate($event: string) {
    this.selectedDate = $event;
  }

  updateHabit(habit: Habit) {
    if (this.habitsArray) {
      const idx = this.habitsArray?.findIndex(h => h.uid === habit.uid);
      this.habitsArray[idx] = habit;
      this.habitService.setHabits({data: this.habitsArray}).pipe(take(1)).subscribe();
    }
  }
}
