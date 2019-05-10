import { NgModule } from "@angular/core";
import { ScheduleApiService } from "../../shared/api/schedule/schedule.api.service";
import { ScheduleComponent } from "./schedule.component";
import { ScheduleFilterComponent } from "./schedule-filter/schedule-filter.component";

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleFilterComponent
  ],
  entryComponents: [],
  exports: [ScheduleComponent],
  providers: [ScheduleApiService]
})
export class ScheduleModule {}
