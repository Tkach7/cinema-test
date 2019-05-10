import {Component, Input, OnInit} from '@angular/core';
import {ScheduleItem} from '../../../shared/api/schedule/schedule.api.entity';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnInit {
  @Input() name: string;
  @Input() items: ScheduleItem[];

  constructor() { }

  ngOnInit() {
  }

}
