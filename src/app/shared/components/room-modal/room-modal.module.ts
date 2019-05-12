import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScheduleApiService } from "../../api/schedule/schedule.api.service";
import { RoomsApiService } from "../../api/rooms/rooms.api.service";
import { RoomModalComponent } from "./room-modal.component";
import { NgbButtonsModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [CommonModule, NgbButtonsModule],
  declarations: [RoomModalComponent],
  exports: [RoomModalComponent],
  providers: [ScheduleApiService, RoomsApiService]
})
export class RoomModalModule {}
