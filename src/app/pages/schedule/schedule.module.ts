import { NgModule } from "@angular/core";
import { ScheduleApiService } from "../../shared/api/schedule/schedule.api.service";
import { ScheduleComponent } from "./schedule.component";
import { ScheduleFilterComponent } from "./schedule-filter/schedule-filter.component";
import { ScheduleItemComponent } from "./schedule-item/schedule-item.component";
import {
  NgbButtonLabel,
  NgbDatepickerModule,
  NgbRadio,
  NgbRadioGroup,
  NgbModalModule,
  NgbButtonsModule, NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RoomsApiService } from "../../shared/api/rooms/rooms.api.service";
import { RoomModalComponent } from "../../shared/components/room-modal/room-modal.component";
import { RoomModalModule } from "../../shared/components/room-modal/room-modal.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModalModule,
    RoomModalModule,
    NgbButtonsModule,
    NgbTooltipModule
  ],
  declarations: [
    ScheduleComponent,
    ScheduleFilterComponent,
    ScheduleItemComponent
  ],
  entryComponents: [RoomModalComponent],
  exports: [ScheduleComponent],
  providers: [ScheduleApiService, RoomsApiService]
})
export class ScheduleModule {}
