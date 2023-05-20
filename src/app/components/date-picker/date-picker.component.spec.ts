import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerComponent } from './date-picker.component';
import * as dayjs from "dayjs";

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should selected date today', () => {
    expect(component.selectedDateString).toBe(dayjs().format('YYYY-MM-DD'));
  })

  it('should minus one day when call left function', () => {
    component.left();
    expect(dayjs(component.generatorDay).format('YYYY-MM-DD')).toBe(dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD'))
  })

  it('should have only one selected date', () => {
    const selectedList = component.dateList.filter(d => d.selected);
    expect(selectedList.length).toBe(1);
  })
});
