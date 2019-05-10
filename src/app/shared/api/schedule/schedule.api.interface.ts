export namespace ScheduleApiModel {
  export interface ScheduleModel {
    ID: string;
    DATA: string;
    ITEMS: ScheduleItem[];
  }

  export interface ScheduleItem {
    ID: string;
    NAME: string;
    TIME_START: string;
    TIME_END: string;
    ROOM: number;
    IS_PREMIERE: boolean;
    IS_FULL: boolean;
  }

  export interface ScheduleBookItem {
    ID: string;
    ROOM: number;
    TIME_START: string;
    SCHEDULE_ITEM_ID: string;
    PLACE: number;
  }

  export interface BooksApiParams {
    ROOM: number;
    TIME_START: string;
    SCHEDULE_ITEM_ID: string;
  }
}
