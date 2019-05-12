import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FORMAT_DAY } from "../../../shared/constants";
import * as moment from "moment";

@Component({
  selector: "app-schedule-filter",
  templateUrl: "./schedule-filter.component.html",
  styleUrls: ["./schedule-filter.component.scss"]
})
export class ScheduleFilterComponent implements OnInit {
  format = FORMAT_DAY;

  datePickerValue = moment();

  today = moment().format(FORMAT_DAY);
  tomorrow = moment()
    .add(1, "days")
    .format(FORMAT_DAY);

  selectedDay = this.today;

  @Output() selected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.selected.emit(moment().format(FORMAT_DAY));
  }
  onSelectedDate({ month, day }): void {
    this.selectedDay = moment()
      .month(month - 1)
      .date(day)
      .format(FORMAT_DAY);
    this.selected.emit(this.selectedDay);
  }
}
