import {Component, OnInit} from '@angular/core';
import {HabitService} from "../../services/habit.service";
import {map, Observable, take} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Habit} from "../../models/habit";

@Component({
  selector: 'app-details-habit',
  templateUrl: './details-habit.component.html',
  styleUrls: ['./details-habit.component.scss']
})
export class DetailsHabitComponent implements OnInit{
  habit$: Observable<Habit | undefined> | undefined;

  constructor(private habitService: HabitService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.habit$ = this.habitService.getHabit(this.route.snapshot.params['id']).pipe(take(1));
  }
}
