import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import firebase from "firebase/compat";
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<any>(null);
  constructor(private angularFirestore: AngularFirestore,
              private angularFireAuth: AngularFireAuth,
              private router: Router) {

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
        console.log(result);
        this.user$.next(result.user);
        this.angularFireAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['welcome']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth']);
    });
  }

  isLoggedIn() {
    return this.angularFireAuth.user
  }
}
