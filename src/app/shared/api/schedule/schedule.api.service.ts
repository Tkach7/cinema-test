import { Injectable } from "@angular/core";
import { ScheduleApiModel } from "./schedule.api.interface";
import {
  Schedule,
  ScheduleBookItem,
  ScheduleItem,
  ScheduleItemsByName
} from "./schedule.api.entity";
import BooksApiParams = ScheduleApiModel.BooksApiParams;
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { LocalStorageService } from "../../services/localstorage.service";
import * as moment from "moment";
import { FORMAT_DAY } from "../../constants";

@Injectable()
export class ScheduleApiService {
  private static mapBooking(
    booking: ScheduleApiModel.ScheduleBookItem[]
  ): ScheduleBookItem[] {
    return booking.map(
      b =>
        new ScheduleBookItem(
          b.ID,
          b.ROOM,
          b.TIME_START,
          b.SCHEDULE_ITEM_ID,
          b.PLACE
        )
    );
  }

  private static mapSchedule(
    SCHEDULE: ScheduleApiModel.ScheduleModel
  ): Schedule {
    if (!SCHEDULE) {
      return null;
    }
    const items: ScheduleItem[] = SCHEDULE.ITEMS.map(
      ScheduleApiService.mapItem.bind(null, SCHEDULE.DATA)
    );
    const groupedByName: ScheduleItemsByName = items.reduce((acc, item) => {
      acc[item.name] = acc[item.name] ? acc[item.name].concat(item) : [item];
      return acc;
    }, {});
    return new Schedule(SCHEDULE.ID, SCHEDULE.DATA, groupedByName);
  }

  private static mapItem(
    data: string,
    ITEM: ScheduleApiModel.ScheduleItem
  ): ScheduleItem {
    const [h, m] = ITEM.TIME_START.split(":");
    const itemDate = moment(data, FORMAT_DAY)
      .hour(+h)
      .minute(+m);
    const passed = moment().isAfter(itemDate);
    return new ScheduleItem(
      ITEM.ID,
      ITEM.NAME,
      ITEM.TIME_START,
      ITEM.TIME_END,
      ITEM.ROOM,
      ITEM.IS_PREMIERE,
      ITEM.IS_FULL,
      passed
    );
  }
  public addBooking(items: ScheduleBookItem[]) {
    const formatApiItems = [];
    items.forEach(item =>
      formatApiItems.push({
        ID: item.id,
        ROOM: item.room,
        TIME_START: item.start,
        SCHEDULE_ITEM_ID: item.scheduleItemId,
        PLACE: item.place
      })
    );
    LocalStorageService.addBooking(formatApiItems);
    return of(null).pipe(delay(2000));
  }

  public getBooks(params: BooksApiParams) {
    return of(
      ScheduleApiService.mapBooking(
        LocalStorageService.getBookingFromStorage(params)
      )
    ).pipe(delay(2000));
  }

  public getSchedule(data: string) {
    return of(
      ScheduleApiService.mapSchedule(
        LocalStorageService.getScheduleFromStorage(data)
      )
    ).pipe(delay(2000));
  }
}
