import { Injectable } from "@angular/core";
import * as moment from "moment";
import { FORMAT_DAY } from "../constants";
import {
  generateSchedule,
  generateScheduleBook
} from "../api/schedule/schedule.api.mock";
import { ScheduleApiModel } from "../api/schedule/schedule.api.interface";
import { RoomsApiModel } from "../api/rooms/rooms.api.interface";
import { ROOMS } from "../api/rooms/rooms.api.mock";
import BooksApiParams = ScheduleApiModel.BooksApiParams;
import { getId } from "../utils";

const SCHEDULES_KEY = "SCHEDULES";
const ROOMS_KEY = "ROOMS";
const BOOKING_KEY = "BOOKING";

@Injectable()
export class LocalStorageService {
  public static getRoom(name: number): RoomsApiModel.RoomItem {
    let rooms = localStorage.getItem(ROOMS_KEY);
    if (!rooms) {
      LocalStorageService.setMockRooms();
      rooms = localStorage.getItem(ROOMS_KEY);
    }
    rooms = JSON.parse(rooms);
    return (rooms as any).find(
      (r: RoomsApiModel.RoomItem) => r.NUMBER === name
    ) as RoomsApiModel.RoomItem;
  }

  private static setMockRooms() {
    localStorage.setItem(ROOMS_KEY, JSON.stringify(ROOMS));
  }

  public static addBooking(items: ScheduleApiModel.ScheduleBookItem[]): void {
    let booking = localStorage.getItem(BOOKING_KEY);
    booking = JSON.parse(booking);
    items.forEach(item => {
      item.ID = getId();
      booking[item.SCHEDULE_ITEM_ID].push(item);
    });
    localStorage.setItem(BOOKING_KEY, JSON.stringify(booking));
  }

  public static getBookingFromStorage(
    params: BooksApiParams
  ): ScheduleApiModel.ScheduleBookItem[] {
    let booking = localStorage.getItem(BOOKING_KEY);
    if (!booking) {
      LocalStorageService.setMockBooking();
      booking = localStorage.getItem(BOOKING_KEY);
    }
    booking = JSON.parse(booking);
    const bookFromDay = booking[
      params.SCHEDULE_ITEM_ID
    ] as ScheduleApiModel.ScheduleBookItem[];
    return bookFromDay.filter(
      b => b.TIME_START === params.TIME_START && b.ROOM === params.ROOM
    );
  }
  public static getScheduleFromStorage(
    data: string
  ): ScheduleApiModel.ScheduleModel {
    let schedules = localStorage.getItem(SCHEDULES_KEY);
    if (!schedules) {
      LocalStorageService.setMockSchedules();
      schedules = localStorage.getItem(SCHEDULES_KEY);
    }
    schedules = JSON.parse(schedules);
    return (schedules as any).find(
      s => s.DATA === data
    ) as ScheduleApiModel.ScheduleModel;
  }

  private static setMockBooking() {
    const schedules = JSON.parse(localStorage.getItem(SCHEDULES_KEY));
    const booking = schedules.reduce((stack, s) => {
      stack[s.ID] = generateScheduleBook(s);
      return stack;
    }, {});
    localStorage.setItem(BOOKING_KEY, JSON.stringify(booking));
  }

  private static setMockSchedules(): void {
    const DATES = [
      moment()
        .subtract(1, "days")
        .format(FORMAT_DAY),
      moment().format(FORMAT_DAY),
      moment()
        .add(1, "days")
        .format(FORMAT_DAY),
      moment()
        .add(2, "days")
        .format(FORMAT_DAY),
      moment()
        .add(3, "days")
        .format(FORMAT_DAY)
    ];

    const schedules = DATES.reduce((result, d) => {
      return result.concat(generateSchedule(d));
    }, []);

    localStorage.setItem(SCHEDULES_KEY, JSON.stringify(schedules));
  }
}
