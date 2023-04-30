import {FormControl} from "@angular/forms";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
export interface HabitForm {
  uid: FormControl<string>;
  isActive: FormControl<boolean>;
  color: FormControl<string>;
  history: FormControl<{ date: Timestamp; value: number }[]>;
  name: FormControl<string>;
  unit: FormControl<string>;
  goal: FormControl<number | undefined>;
  icon: FormControl<string>;
  startDate: FormControl<string | Timestamp>;
  description: FormControl<string>;
}
