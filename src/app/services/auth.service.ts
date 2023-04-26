import { Injectable } from '@angular/core';
import {
  AngularFirestore,
} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {Router} from "@angular/router";
import firebase from "firebase/compat";
import {UserProfile} from "../models/user-profile";
import {SignUpModel} from "../models/sign-up-model";
import {HabitService} from "./habit.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<any | firebase.User>(null);
  private dbPath = 'users';
  signInErrorMessage$ = new BehaviorSubject<string | null>(null);
  signUpErrorMessage$ = new BehaviorSubject<string | null>(null);
  isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private angularFirestore: AngularFirestore,
              private angularFireAuth: AngularFireAuth,
              private router: Router,
              private habitService: HabitService) {

    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.user$.next(user);
      }
    });
  }

  signIn(email: string, password: string) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.user$.next(result.user);
        this.angularFireAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/app']);
            this.signInErrorMessage$.next(null);
          }
        });
      })
      .catch((error) => {
        this.signInErrorMessage$.next(error.message);
      });
  }

  signUp(signUpData: SignUpModel) {
    this.isLoading$.next(true);
    return this.angularFireAuth
      .createUserWithEmailAndPassword(signUpData.email, signUpData.password)
      .then(async (result) => {
        await this.createProfile(signUpData, result.user?.uid);
        await this.habitService.setEmptyHabits(result?.user?.uid);
        this.router.navigate(['/app']);
        this.signUpErrorMessage$.next(null);
      })
      .catch((error) => {
        this.signUpErrorMessage$.next(error.message);
      }).finally(() => this.isLoading$.next(false));
  }

  createProfile(signUpData: SignUpModel, uid: string | undefined) {
    const userData = {
      uid: uid,
      displayName: signUpData.displayName,
      email: signUpData.email,
      description: signUpData.description
    }
    return this.angularFirestore.collection(this.dbPath).doc(uid).set(userData);
  }

  signOut() {
    return this.angularFireAuth.signOut().then(() => {
      this.router.navigate(['auth']);
    });
  }

  getUserProfile(): Observable<UserProfile> {
    return this.angularFireAuth.user.pipe(
      switchMap(res => this.angularFirestore.collection(this.dbPath).doc(res?.uid).valueChanges())
    ) as Observable<UserProfile>;
  }
}
