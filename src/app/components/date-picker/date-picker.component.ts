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
  constructor() {
  }

  ngOnInit(): void {
    for (let i = 4; i >= 0; i--) {
      const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
      const dateItem = {
        value: date,
        selected: date === dayjs().format('YYYY-MM-DD')
      }
      this.dateList.push(dateItem);
      if (dateItem.selected) this.selectDateEvent.emit(dateItem.value);
    }
  }

  selectDate(dateItem: DateItem) {
    this.dateList.map(d => d.selected = false);
    dateItem.selected = true;
    this.selectDateEvent.emit(dateItem.value);
  }
}
