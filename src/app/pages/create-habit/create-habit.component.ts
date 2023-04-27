import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as dayjs from "dayjs";
import {v4 as uuidv4} from 'uuid';
import {HabitService} from "../../services/habit.service";
import {pipe, Subscription, take} from "rxjs";
import {Habit} from "../../models/habit";
import {Router} from "@angular/router";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {IconStorageService} from "../../services/icon-storage.service";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.component.html',
  styleUrls: ['./create-habit.component.scss']
})
export class CreateHabitComponent implements OnInit {

  habitForm: FormGroup = new FormGroup<any>({
    uid: new FormControl(uuidv4()),
    isActive: new FormControl(true),
    color: new FormControl('blue'),
    history: new FormControl([]),
    name: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    goal: new FormControl(undefined, [Validators.required, Validators.min(1)]),
    icon: new FormControl('none', Validators.required),
    startDate: new FormControl(),
    description: new FormControl('')
  })
  userHabits: Habit[] | undefined;
  today = dayjs().format('YYYY-MM-DD');
  iconItems: { name: string; icon: IconDefinition; }[] | undefined;

  constructor(private habitService: HabitService, private iconStorageService: IconStorageService, private router: Router) {

  }

  submit() {
    if (this.userHabits) {
      this.habitForm.controls['startDate'].setValue(firebase.firestore.Timestamp.fromDate(new Date()));
      this.userHabits?.push(this.habitForm.value);
      this.habitService.setHabits({data: this.userHabits}).pipe(take(1)).subscribe(() => {
        this.router.navigate(['/app'])
      });
    }
  }

  ngOnInit(): void {
    this.iconItems = this.iconStorageService.getIcons();
    this.habitService.getHabits().pipe(take(1)).subscribe(res => {
      this.userHabits = res;
    });
  }
}
