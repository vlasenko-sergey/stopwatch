import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopwatchComponent } from '@shared/components/stopwatch/stopwatch.component';
import { ClockDisplayComponent } from '@shared/components/clock-display/clock-display.component';
import { RecordComponent } from '@shared/components/record/record.component';
import { RecordsTableComponent } from '@shared/components/records-table/records-table.component';
import { DigitComponent } from '@shared/components/digit/digit.component';
import { StopwatchWithRecordsComponent } from '@shared/components/stopwatch-with-records/stopwatch-with-records.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    StopwatchComponent,
    ClockDisplayComponent,
    RecordComponent,
    RecordsTableComponent,
    DigitComponent,
    StopwatchWithRecordsComponent
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
  ],
  exports: [
    StopwatchComponent,
    ClockDisplayComponent,
    RecordComponent,
    RecordsTableComponent,
    DigitComponent,
    StopwatchWithRecordsComponent
  ]
})
export class SharedModule { }
