import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {DatePickerComponent} from "../../../components/date-picker/date-picker.component";
import {SkeletonHabitComponent} from "../../../components/skeleton-habit/skeleton-habit.component";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, DatePickerComponent, SkeletonHabitComponent ],
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
