import {Component, OnInit} from '@angular/core';
import * as dayjs from "dayjs";
import {HabitService} from "../../../services/habit.service";
import {Observable, tap} from "rxjs";
import {Habit} from "../../../models/habit";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  selectedDate: string | undefined;
  habits$: Observable<Habit[]> | undefined;

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
        console.log(res);
      })
    );
  }

  selectDate($event: string) {
    this.selectedDate = $event;
  }
}
