import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
  selector: 'app-create-update-habit',
  templateUrl: './create-update-habit.component.html',
  styleUrls: ['./create-update-habit.component.scss']
})
export class CreateUpdateHabitComponent implements OnInit {

  @Input() create = true;
  @Input() set setHabit(habit: Habit) {
    this.habitForm = new FormGroup<any>({
      uid: new FormControl(habit.uid),
      isActive: new FormControl(habit.isActive),
      color: new FormControl(habit.color),
      history: new FormControl(habit.history),
      name: new FormControl(habit.name, Validators.required),
      unit: new FormControl(habit.unit, Validators.required),
      goal: new FormControl({value: habit.goal, disabled: true}, [Validators.required, Validators.min(1)]),
      icon: new FormControl(habit.icon, Validators.required),
      startDate: new FormControl({value: dayjs(habit.startDate.toDate()).format('YYYY-MM-DD'), disabled: true}),
      description: new FormControl(habit.description)
    })
  }

  userHabits: Habit[] | undefined;
  iconItems: { name: string; icon: IconDefinition; }[] | undefined;
  habitForm: FormGroup<any> | undefined;

  constructor(private habitService: HabitService, private iconStorageService: IconStorageService, private router: Router) {

  }

  submit() {
    if (this.userHabits && this.habitForm) {
      if (this.create) {
        let item = this.habitForm?.value;
        item.startDate = firebase.firestore.Timestamp.fromDate(new Date());
        this.userHabits?.push(item);
        this.habitService.setHabits({data: this.userHabits}).pipe(take(1)).subscribe(() => {
          this.router.navigate(['/app'])
        });
      } else {
        const date = dayjs(this.habitForm?.controls['startDate'].value).toDate();
        const idx = this.userHabits?.findIndex(h => h.uid === this.habitForm?.controls['uid'].value);
        let item = this.habitForm?.getRawValue();
        item.startDate = firebase.firestore.Timestamp.fromDate(date);
        this.userHabits[idx] = item;
        this.habitService.setHabits({data: this.userHabits}).pipe(take(1)).subscribe();
      }

    }
  }

  ngOnInit(): void {
    if (this.create) {
      this.habitForm = new FormGroup<any>({
        uid: new FormControl(uuidv4()),
        isActive: new FormControl(true),
        color: new FormControl('blue'),
        history: new FormControl([]),
        name: new FormControl('', Validators.required),
        unit: new FormControl('', Validators.required),
        goal: new FormControl(undefined, [Validators.required, Validators.min(1)]),
        icon: new FormControl('none', Validators.required),
        startDate: new FormControl({value: dayjs().format('YYYY-MM-DD'), disabled: true}),
        description: new FormControl('')
      })
    }


    this.iconItems = this.iconStorageService.getIcons();
    this.habitService.getHabits().pipe(take(1)).subscribe(res => {
      this.userHabits = res;
    });
  }
}
