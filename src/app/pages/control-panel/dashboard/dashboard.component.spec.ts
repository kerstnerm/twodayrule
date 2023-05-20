import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardComponent} from './dashboard.component';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {DatePickerComponent} from "../../../components/date-picker/date-picker.component";
import {SkeletonHabitComponent} from "../../../components/skeleton-habit/skeleton-habit.component";
import {AuthService} from "../../../services/auth.service";
import {take} from "rxjs";
import * as dayjs from "dayjs";
import {By} from "@angular/platform-browser";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, DatePickerComponent, SkeletonHabitComponent],
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        },
        // AuthService
      ]
    })
      .compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', (done) => {
    fixture.detectChanges();
    expect(component.habitsArray).toBeUndefined();
    component.habits$?.pipe(take(1)).subscribe(() => {
      expect(component.habitsArray).toBeDefined();
      done();
    });
  });

  it('should today the default selected date', () => {
    fixture.detectChanges();
    expect(component.selectedDate).toBe(dayjs().format('YYYY-MM-DD'));
  });

  it('should display selected date', () => {
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('#selectedDate')).nativeElement;
    expect(title.innerHTML).toBe(component.selectedDate);
  })
});
