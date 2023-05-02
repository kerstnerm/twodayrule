import {Component, OnInit} from '@angular/core';
import {HabitService} from "../../services/habit.service";
import {map, Observable} from "rxjs";
import {Habit} from "../../models/habit";

@Component({
  selector: 'app-chart-statistics',
  templateUrl: './chart-statistics.component.html',
  styleUrls: ['./chart-statistics.component.scss']
})
export class ChartStatisticsComponent implements OnInit{
  data = [
    {
      "name": "Germany",
      "value": 40632,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "United States",
      "value": 50000,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "France",
      "value": 36745,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "United Kingdom",
      "value": 36240,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "Spain",
      "value": 33000,
      "extra": {
        "code": "es"
      }
    },
    {
      "name": "Italy",
      "value": 35800,
      "extra": {
        "code": "it"
      }
    }
  ]
  habits$: Observable<{ name: string; results: { name: string; value: number }[] }[]>;

  constructor(private habitService: HabitService) {
    this.habits$ = habitService.getHabits().pipe(
      map(habits => {
        const items: {name: string, results: { name: string; value: number; }[]}[] = [];
        habits.map(habit => {
          const nameValuePair: { name: string; value: number; }[] = [];
          habit.statistics?.map(s => {
            const item = {
              name: s.day,
              value: s.value
            };
            nameValuePair.push(item);
          })
          const barValue = {
            name: habit.name,
            results: nameValuePair
          }
          items.push(barValue);
        })
        return items;
      })
    );
  }
  ngOnInit() {

  }
}
