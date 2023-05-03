import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface Habit {
  uid: string;
  color: string;
  description: string;
  goal: number;
  icon: string;
  isActive: boolean;
  name: string;
  startDate: Timestamp;
  unit: string;
  history: { date: Timestamp; value: number }[];
  statistics?: {day: string; value: number, reached: boolean}[];
  chartResults?: { name: string; value: number; }[];
}
