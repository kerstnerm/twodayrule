import {Component, OnInit} from '@angular/core';
import * as dayjs from "dayjs";
import {DateItem} from "../../../models/date-item";
import {HabitService} from "../../../services/habit.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  selectedDate: string | undefined;
  constructor(private habitService: HabitService) {
  }

  ngOnInit(): void {
    this.habitService.getHabits().subscribe((res: { startDate: string | number | Date | dayjs.Dayjs | null | undefined; }) => {
      console.log(res);
      // @ts-ignore
      console.log('date', res[0].startDate.toDate())
      // this.habitService.setHabit({data: res}).subscribe();
    })


  }

  selectDate($event: string) {
    this.selectedDate = $event;
  }
}
