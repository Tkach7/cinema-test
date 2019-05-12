import { ScheduleApiModel } from "./schedule.api.interface";
import * as Moment from "moment";
import { getId, randomItem, randomInteger } from "../../utils";

const SESSIONS = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const ROOMS = [1, 2, 3, 4, 5];
const NAMES = [
  "AVENGERS",
  "SPIDER MAN",
  "IRON MAN",
  "1+1",
  "How to Train Your Dragon"
];

export const generateSchedule = (
  DATA: string
): ScheduleApiModel.ScheduleModel => {
  const ID = getId();
  const ITEMS = [];
  SESSIONS.forEach(session => {
    let notUsed = [...ROOMS];
    NAMES.forEach(NAME => {
      const ROOM = randomItem(notUsed);
      notUsed = notUsed.filter(r => r !== ROOM);
      const [h, m] = session.split(":");
      const TIME_END = `${Moment()
        .hour(+h)
        .add(2, "hour")
        .hours()}:${m}`;
      ITEMS.push({
        ID: getId(),
        NAME,
        TIME_START: session,
        TIME_END,
        ROOM,
        IS_PREMIERE: NAME === "AVENGERS",
        IS_FULL: false
      });
    });
  });
  return { ID, DATA, ITEMS };
};
export const generateScheduleBook = (
  schedule: ScheduleApiModel.ScheduleModel
) => {
  const BOOKS = [];
  schedule.ITEMS.forEach(item => {
    const ID = getId();
    Array(randomInteger(1, 8))
      .fill(0)
      .forEach((_, i) => {
        BOOKS.push({
          ID,
          ROOM: item.ROOM,
          TIME_START: item.TIME_START,
          SCHEDULE_ITEM_ID: schedule.ID,
          PLACE: i + 1
        });
      });
  });
  return BOOKS;
};
