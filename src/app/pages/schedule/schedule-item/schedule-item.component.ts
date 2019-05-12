import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ScheduleItem } from "../../../shared/api/schedule/schedule.api.entity";
import {
  ModalRoomAction,
  RoomModalComponent
} from "../../../shared/components/room-modal/room-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-schedule-item",
  templateUrl: "./schedule-item.component.html",
  styleUrls: ["./schedule-item.component.scss"]
})
export class ScheduleItemComponent implements OnInit {
  @Input() name: string;
  @Input() items: ScheduleItem[];
  @Input() scheduleId: string;

  @Output() closeRoomModal = new EventEmitter<ModalRoomAction>();

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  openRoom(item: ScheduleItem): void {
    const modal = this.modalService.open(RoomModalComponent, {
      size: "lg",
      centered: true
    });
    (<RoomModalComponent>modal.componentInstance).data = {
      room: item.room,
      timeStart: item.start,
      scheduleId: this.scheduleId,
      filmName: item.name
    };

    modal.result.then(
      () => {},
      (reason: ModalRoomAction) => {
        this.closeRoomModal.emit(reason);
      }
    );
  }
}
