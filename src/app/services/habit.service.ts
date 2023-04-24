import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Observable, switchMap} from "rxjs";
import {UserProfile} from "../models/user-profile";
import {Habit} from "../models/habit";

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private dbPath = 'habits';
  constructor(private angularFirestore: AngularFirestore,
              private angularFireAuth: AngularFireAuth) { }

  getHabits() {
    return this.angularFireAuth.user.pipe(
      switchMap(res => this.angularFirestore.collection(this.dbPath).doc(res?.uid).valueChanges()),
      map((res: any) => {
        return res.data;
      })
    ) as Observable<Habit[]>;
  }

  setHabit(habit: any) {
    return this.angularFireAuth.user.pipe(
      switchMap(res => this.angularFirestore.collection(this.dbPath).doc(res?.uid).valueChanges().pipe(
        switchMap(result => this.angularFirestore.collection(this.dbPath).doc('abcdelet').set(habit))
      ))
    )
  }

}