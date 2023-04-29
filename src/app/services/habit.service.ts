import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {BehaviorSubject, map, Observable, switchMap, tap} from "rxjs";
import {UserProfile} from "../models/user-profile";
import {Habit} from "../models/habit";
import * as dayjs from "dayjs";

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private dbPath = 'habits';
  todayHabits$ = new BehaviorSubject(0);
  constructor(private angularFirestore: AngularFirestore,
              private angularFireAuth: AngularFireAuth) { }

  getHabits(): Observable<Habit[]> {
    return this.angularFireAuth.user.pipe(
      switchMap(res => this.angularFirestore.collection(this.dbPath).doc(res?.uid).valueChanges()),
      tap((res: any) => {
        this.calculateTodayNotDoneHabits(res.data);
      }),
      map((res: {data: Habit[]}) => {
        console.log(res);
        return res.data;
      })
    );
  }

  getHabit(uid: string) {
    return this.getHabits().pipe(
      map(res => {
        return res.find(habit => habit.uid === uid);
      })
    )
  }

  setEmptyHabits(uid: string | undefined) {
    this.angularFirestore.collection(this.dbPath).doc(uid).set({data: []});
  }

  setHabits(obj: {data: Habit[]}) {
    return this.angularFireAuth.user.pipe(
      switchMap(res => this.angularFirestore.collection(this.dbPath).doc(res?.uid).valueChanges().pipe(
        switchMap(result => this.angularFirestore.collection(this.dbPath).doc(res?.uid).set(obj))
      ))
    )
  }

  private calculateTodayNotDoneHabits(data: Habit[]) {
    const todayHabits = data.filter((h: Habit) => dayjs(h.startDate.toDate()).format('YYYY-MM-DD') <= dayjs().format('YYYY-MM-DD'));
    let notDoneHabit = 0;
    for (const habit of todayHabits as Habit[]) {
      let count = 0;
      for (const history of habit.history) {
        if (dayjs(history.date.toDate()).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD'))
        {
          count += history.value;
        }
      }

      if (habit.goal > count) {
        notDoneHabit ++
      }
    }
    this.todayHabits$.next(notDoneHabit);
  }
}
