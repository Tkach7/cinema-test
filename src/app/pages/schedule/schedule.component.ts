import { Component } from "@angular/core";
import { ScheduleApiService } from "../../shared/api/schedule/schedule.api.service";
import {
  Schedule,
  ScheduleItem
} from "../../shared/api/schedule/schedule.api.entity";
import { ModalRoomAction } from "../../shared/components/room-modal/room-modal.component";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"]
})
export class ScheduleComponent {
  loading = false;
  noData = false;
  schedule: Schedule;
  scheduleItems: ScheduleItem[][];

  constructor(private scheduleApiService: ScheduleApiService) {}

  fetch(date: string): void {
    this.loading = true;
    this.scheduleApiService
      .getSchedule(date)
      .subscribe(
        this.getScheduleSucceed.bind(this),
        this.onApiError.bind(this)
      );
  }

  onUpdateDate(date: string): void {
    this.fetch(date);
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

  onCloseRoom(reason: ModalRoomAction) {
    if (reason === ModalRoomAction.Confirm) {
      this.fetch(this.schedule.date);
    }
  }
}
