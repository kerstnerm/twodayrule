import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HabitService} from "../../services/habit.service";
import {Observable, take, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Habit} from "../../models/habit";
import * as dayjs from "dayjs";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-details-habit',
  templateUrl: './details-habit.component.html',
  styleUrls: ['./details-habit.component.scss']
})
export class DetailsHabitComponent implements OnInit {
  habit$: Observable<Habit | undefined> | undefined;
  knobValue = 0;
  originalValue = 0;
  faTrash = faTrash
  readonly todayDateString = dayjs().format('YYYY-MM-DD');
  @ViewChild('successRemove') successRemoveButton: ElementRef | undefined;

  constructor(private habitService: HabitService, private route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
    this.habit$ = this.habitService.getHabit(this.route.snapshot.params['id']).pipe(
      tap(res => {
        this.calculateKnobValue(res);
      })
    );
  }

  private calculateKnobValue(res: Habit | undefined) {
    this.knobValue = 0;
    this.originalValue = 0;
    const todayHistory = res?.history.filter(history => dayjs(history.date.toDate()).format('YYYY-MM-DD') === this.todayDateString);
    todayHistory?.forEach(history => {
      this.knobValue += history.value;
      this.originalValue += history.value;
    })
  }

  saveValue() {
    const value = this.knobValue - this.originalValue;
    console.log(value);
    this.habitService.getHabits().pipe(take(1)).subscribe(res => {
      const idx = res?.findIndex(h => h.uid === this.route.snapshot.params['id']);
      const item = {
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        value: value
      }
      res[idx].history.push(item);
      this.habitService.setHabits({data: res}).pipe(take(1)).subscribe();

    })
  }

  removeHabit(removeItemUid: string) {
    this.habitService.getHabits().pipe(take(1)).subscribe(res => {
      const filteredHabits = res.filter(h => h.uid !== removeItemUid)
      this.habitService.setHabits({data: filteredHabits}).pipe(take(1)).subscribe(() => {
        this.successRemoveButton?.nativeElement.click();
      });
    });
  }
}
