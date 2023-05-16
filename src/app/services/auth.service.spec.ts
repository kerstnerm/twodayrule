import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {UserProfile} from "../models/user-profile";
import {take} from "rxjs";

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {


    TestBed.configureTestingModule({
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        }
      ]
    });
    authService = TestBed.inject(AuthService);
  });

  it('should have a user after sign in', (done) => {
    const testUserCred = {email: 'sample@user.hu', password: 'System_1234'};
    const testUserResponse: UserProfile = {
      uid: '3fN76IBocaXdkHs2dcYIhuf0oE02',
      email: 'sample@user.hu',
      displayName: 'Samp Lee',
      description: 'My name is Samp Lee.'
    };
    authService.signIn(testUserCred.email, testUserCred.password).then(() => {
      authService.getUserProfile().pipe(take(1)).subscribe((userProfile: UserProfile) => {
        expect(userProfile).toEqual(testUserResponse);
        done();
      });
    });
  })
});
