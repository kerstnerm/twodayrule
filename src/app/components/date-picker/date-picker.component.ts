import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as dayjs from "dayjs";
import {DateItem} from "../../models/date-item";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit{
  dateList: DateItem[] = [];
  @Output() selectDateEvent = new EventEmitter<string>();
  generatorDay = dayjs();
  selectedDateString = dayjs().format('YYYY-MM-DD');
  constructor() {
  }

  ngOnInit(): void {
    this.generateDays();
  }

  selectDate(dateItem: DateItem) {
    this.dateList.map(d => d.selected = false);
    dateItem.selected = true;
    this.selectedDateString = dateItem.value;
    this.selectDateEvent.emit(dateItem.value);
  }

  left() {
    const tempGeneratorDay = dayjs(this.generatorDay.toDate()).subtract(1, 'day');
    if (tempGeneratorDay >= dayjs('1970-01-01')) {
      this.generatorDay = tempGeneratorDay;
      this.generateDays();
    }
  }

  right() {
    const tempGeneratorDay = dayjs(this.generatorDay.toDate()).add(1, 'day');
    if (tempGeneratorDay <= dayjs()) {
      this.generatorDay = tempGeneratorDay;
      this.generateDays();
    }
  }

  private generateDays() {
    this.dateList = [];
    for (let i = 4; i >= 0; i--) {
      const date = dayjs(this.generatorDay.toDate()).subtract(i, 'day').format('YYYY-MM-DD');
      const dateItem = {
        value: date,
        selected: this.selectedDateString === dayjs(date).format('YYYY-MM-DD')
      }
      this.dateList.push(dateItem);
      if (dateItem.selected) this.selectDateEvent.emit(dateItem.value);
    }
  }
}
