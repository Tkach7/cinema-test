import { Component, OnInit } from "@angular/core";
import { ScheduleApiService } from "../../shared/api/schedule/schedule.api.service";
import {
  Schedule,
  ScheduleItem
} from "../../shared/api/schedule/schedule.api.entity";
import * as moment from "moment";
import { FORMAT_DAY } from "../../shared/constants";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"]
})
export class ScheduleComponent implements OnInit {
  loading = false;
  noData = false;
  schedule: Schedule;
  scheduleItems: ScheduleItem[][];
  date = moment().format(FORMAT_DAY);

  constructor(private scheduleApiService: ScheduleApiService) {}

  ngOnInit() {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.scheduleApiService
      .getSchedule(this.date)
      .subscribe(
        this.getScheduleSucceed.bind(this),
        this.onApiError.bind(this)
      );
  }

  getScheduleSucceed(schedule: Schedule): void {
    this.loading = false;
    this.schedule = schedule;
    this.noData = !this.schedule;
    if (!this.noData) {
      this.scheduleItems = Object.values(this.schedule.items);
    }
  }

  onApiError(e): void {
    this.loading = false;
    console.warn(e);
  }
}
