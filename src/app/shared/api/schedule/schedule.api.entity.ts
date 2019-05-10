export class Schedule {
  constructor(
    public id: string,
    public data: string,
    items: ScheduleItemsByName
  ) {}
}

export class ScheduleItem {
  constructor(
    public id: string,
    public name: string,
    public start: string,
    public end: string,
    public room: number,
    public isPremiere: boolean,
    public isFull: boolean
  ) {}
}

export class ScheduleBookItem {
  constructor(
    public id: string,
    public room: number,
    public start: string,
    public scheduleItemId: string,
    public place: number
  ) {}
}

export interface ScheduleItemsByName {
  [key: string]: ScheduleBookItem[];
}
