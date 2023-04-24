import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface Habit {
  color: string;
  description: string;
  goal: number;
  icon: string;
  isActive: boolean;
  name: string;
  startDate: string;
  unit: string;
  history: { date: Timestamp; value: number }[];
}
