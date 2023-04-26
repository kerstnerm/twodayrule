import { Pipe, PipeTransform } from '@angular/core';
import {Habit} from "../models/habit";
import * as dayjs from "dayjs";

@Pipe({
  name: 'filterHabitsByDate'
})
export class FilterHabitsByDatePipe implements PipeTransform {

  transform(habits: Habit[], selectedDate: string | undefined): Habit[] {
    if (!selectedDate) return habits;
    const filteredHabits = habits.filter(h => dayjs(h.startDate.toDate()).format('YYYY-MM-DD') <= selectedDate);
    return filteredHabits;
  }

}
