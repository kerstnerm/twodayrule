import { TestBed } from '@angular/core/testing';

import { HabitService } from './habit.service';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../environments/environment";

describe('HabitService', () => {
  let habitService: HabitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }]
    });
    habitService = TestBed.inject(HabitService);
  });

  it('should be created', () => {
    expect(habitService).toBeTruthy();
  });
});
