import {Component, OnInit} from '@angular/core';
import {HabitService} from "../../../services/habit.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, tap} from "rxjs";
import {LegendPosition} from "@swimlane/ngx-charts/lib/common/types/legend.model";
import {Habit} from "../../../models/habit";

@Component({
  selector: 'app-view-chart',
  templateUrl: './view-chart.component.html',
  styleUrls: ['./view-chart.component.scss']
})
export class ViewChartComponent implements OnInit {
  habit$: Observable<Habit | undefined> | undefined;
  constructor(private habitService: HabitService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.habit$ = this.habitService.getHabit(this.route.snapshot.params['id']).pipe(
      tap((habit) => {
        if (habit) {
          const nameValuePair: { name: string; value: number; }[] = [];
          habit.statistics?.map(s => {
            const item = {
              name: s.day,
              value: s.value
            };
            nameValuePair.push(item);
          })
          habit.chartResults = nameValuePair;
        }
      })
    );
  }


}
