import { Component, Input, OnInit } from "@angular/core";
import { ScheduleApiService } from "../../api/schedule/schedule.api.service";
import { RoomsApiService } from "../../api/rooms/rooms.api.service";
import { forkJoin } from "rxjs";
import { Room } from "../../api/rooms/rooms.api.entity";
import { ScheduleBookItem } from "../../api/schedule/schedule.api.entity";
import { range } from "../../utils";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

export enum ModalRoomAction {
  Confirm = "Confirm",
  Cancel = "Cancel"
}

interface ModelParams {
  filmName: string;
  room: number;
  scheduleId: string;
  timeStart: string;
}

@Component({
  selector: "app-room-modal",
  templateUrl: "./room-modal.component.html",
  styleUrls: ["./room-modal.component.scss"]
})
export class RoomModalComponent implements OnInit {
  loading = false;
  @Input() data: ModelParams;

  public booking: ScheduleBookItem[];
  public room: Room;
  public modalRoomAction = ModalRoomAction;

  public places: number[];
  public selectedPlaces: number[] = [];

  constructor(
    private scheduleApiService: ScheduleApiService,
    private roomsApiService: RoomsApiService,
    private activeModal: NgbModal
  ) {}

  ngOnInit() {
    this.fetch();
  }

  isTaken(place: number): boolean {
    return this.booking.findIndex(b => b.place === place) > -1;
  }

  fetch() {
    this.loading = true;
    forkJoin([
      this.scheduleApiService.getBooks({
        SCHEDULE_ITEM_ID: this.data.scheduleId,
        ROOM: this.data.room,
        TIME_START: this.data.timeStart
      }),
      this.roomsApiService.getRoom(this.data.room)
    ]).subscribe(this.onDataSucceed.bind(this), this.onApiError.bind(this));
  }

  onSelected(place: number) {
    this.selectedPlaces = this.selectedPlaces.includes(place)
      ? this.selectedPlaces.filter(p => p !== place)
      : this.selectedPlaces.concat(place);
  }

  onDataSucceed([items, room]: [ScheduleBookItem[], Room]) {
    this.loading = false;
    this.room = room;
    this.booking = items;
    this.places = range(room.capacity).map(p => p + 1);
  }

  private getFormattedBooking() {
    return this.selectedPlaces.map(
      p => new ScheduleBookItem(null, this.data.room, this.data.timeStart, this.data.scheduleId, p)
    );
  }

  close(reason: ModalRoomAction) {
    if (reason === ModalRoomAction.Confirm) {
      this.loading = true;
      this.scheduleApiService.addBooking(this.getFormattedBooking()).subscribe(() => {
        this.loading = false;
        this.activeModal.dismissAll(reason);
      });
      return;
    }
    this.activeModal.dismissAll(reason);
  }

  onApiError(e): void {
    this.loading = false;
    console.warn(e);
  }
}
