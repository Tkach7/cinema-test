import { NgModule } from "@angular/core";
import { ScheduleApiService } from "../../shared/api/schedule/schedule.api.service";
import { ScheduleComponent } from "./schedule.component";
import { ScheduleFilterComponent } from "./schedule-filter/schedule-filter.component";
import { ScheduleItemComponent } from "./schedule-item/schedule-item.component";
import {
  NgbButtonLabel,
  NgbDatepicker,
  NgbDatepickerModule,
  NgbRadio,
  NgbRadioGroup
} from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  declarations: [
    ScheduleComponent,
    ScheduleFilterComponent,
    ScheduleItemComponent,
    NgbRadio,
    NgbButtonLabel,
    NgbRadioGroup
  ],
  entryComponents: [],
  exports: [ScheduleComponent],
  providers: [ScheduleApiService]
})
export class ScheduleModule {}
