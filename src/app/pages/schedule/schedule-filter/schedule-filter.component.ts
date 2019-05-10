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
  date = moment();

  today = moment().format(FORMAT_DAY);
  tomorow = moment()
    .add(1, "days")
    .format(FORMAT_DAY);

  selectedDay = this.today;

  @Output() selected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.selected.emit(moment().format(FORMAT_DAY));
  }

  onSelectedDate({ year, month, day }): void {
    this.selected.emit(
      `${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }-${year}`
    ); // todo: refactor
  }
}
