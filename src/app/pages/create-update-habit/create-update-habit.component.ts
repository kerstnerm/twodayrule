import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {HabitForm} from "../../models/habit-form";

@Component({
  selector: 'app-create-update-habit',
  templateUrl: './create-update-habit.component.html',
  styleUrls: ['./create-update-habit.component.scss']
})
export class CreateUpdateHabitComponent implements OnInit {

  @Input() create = true;
  @Input() set setHabit(habit: Habit) {
    this.habitForm = new FormGroup<HabitForm>({
      uid: new FormControl(habit.uid, {nonNullable: true}),
      isActive: new FormControl(habit.isActive, {nonNullable: true}),
      color: new FormControl(habit.color, {nonNullable: true}),
      history: new FormControl(habit.history, {nonNullable: true}),
      name: new FormControl(habit.name, {nonNullable: true, validators: Validators.required}),
      unit: new FormControl(habit.unit, {nonNullable: true, validators: Validators.required}),
      goal: new FormControl({value: habit.goal, disabled: true}, {nonNullable: true, validators: [Validators.required, Validators.min(1)]}),
      icon: new FormControl(habit.icon, {nonNullable: true, validators: Validators.required}),
      startDate: new FormControl({value: dayjs(habit.startDate.toDate()).format('YYYY-MM-DD'), disabled: true}, {nonNullable: true, validators: Validators.required}),
      description: new FormControl(habit.description || '', {nonNullable: true})
    })
  }
  @ViewChild('successSwal') successSwal: ElementRef | undefined;

  userHabits: Habit[] | undefined;
  iconItems: { name: string; icon: IconDefinition; }[] | undefined;
  habitForm: FormGroup<HabitForm> | undefined;

  constructor(private habitService: HabitService, private iconStorageService: IconStorageService, public router: Router) {

  }

  submit() {
    if (this.userHabits && this.habitForm) {
      if (this.create) {
        let item = <Habit>this.habitForm?.getRawValue();
        item.startDate = firebase.firestore.Timestamp.fromDate(new Date());
        this.userHabits?.push(item);
        this.habitService.setHabits({data: this.userHabits}).pipe(take(1)).subscribe(() => this.successSwal?.nativeElement.click());
      } else {
        const date = dayjs(<string>this.habitForm?.controls['startDate'].value).toDate();
        const idx = this.userHabits?.findIndex(h => h.uid === this.habitForm?.controls['uid'].value);
        let item = <Habit>this.habitForm?.getRawValue();
        item.startDate = firebase.firestore.Timestamp.fromDate(date);
        this.userHabits[idx] = item;
        this.habitService.setHabits({data: this.userHabits}).pipe(take(1)).subscribe(() => this.successSwal?.nativeElement.click());
      }

    }
  }

  ngOnInit(): void {
    if (this.create) {
      this.habitForm = new FormGroup<HabitForm>({
        uid: new FormControl(uuidv4(), {nonNullable: true}),
        isActive: new FormControl(true, {nonNullable: true}),
        color: new FormControl('blue', {nonNullable: true}),
        history: new FormControl([], {nonNullable: true}),
        name: new FormControl('', {nonNullable: true, validators: Validators.required}),
        unit: new FormControl('', {nonNullable: true, validators: Validators.required}),
        goal: new FormControl(undefined, {nonNullable: true, validators: [Validators.required, Validators.min(1)]}),
        icon: new FormControl('none', {nonNullable: true, validators: Validators.required}),
        startDate: new FormControl({value: dayjs().format('YYYY-MM-DD'), disabled: true}, {nonNullable: true, validators: Validators.required}),
        description: new FormControl('', {nonNullable: true})
      })
    }

    this.iconItems = this.iconStorageService.getIcons();
    this.habitService.getHabits().pipe(take(1)).subscribe(res => {
      this.userHabits = res;
    });
  }
}
