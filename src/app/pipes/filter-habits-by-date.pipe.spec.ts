import { FilterHabitsByDatePipe } from './filter-habits-by-date.pipe';
import * as dayjs from "dayjs";
import {Habit} from "../models/habit";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

describe('FilterHabitsByDatePipe', () => {
  const mockHabits: Habit[] = [
    {
      name: 'cycle',
      color: 'blue',
      unit: 'minutes',
      icon: 'cycle',
      uid: '123456',
      goal: 30,
      isActive: true,
      description: 'no description for',
      history: [],
      startDate: firebase.firestore.Timestamp.fromDate(new Date())
    },
    {
      name: 'run',
      color: 'blue',
      unit: 'minutes',
      icon: 'run',
      uid: '789456',
      goal: 50,
      isActive: true,
      description: 'no description for',
      history: [],
      startDate: firebase.firestore.Timestamp.fromDate(dayjs('2023-05-10').toDate())
    }
  ]

  it('create an instance', () => {
    const pipe = new FilterHabitsByDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter an instance', () => {
    const selectedDate = '2023-05-12';
    const pipe = new FilterHabitsByDatePipe();
    const result = pipe.transform(mockHabits, selectedDate);
    expect(result.length).toEqual(1);
  });
});
