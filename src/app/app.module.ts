import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { ClockDisplayComponent } from './clock-display/clock-display.component';
import { RecordComponent } from './record/record.component';
import { RecordsTableComponent } from './records-table/records-table.component';
import { DigitComponent } from './digit/digit.component';

@NgModule({
  declarations: [
    AppComponent,
    StopwatchComponent,
    ClockDisplayComponent,
    RecordComponent,
    RecordsTableComponent,
    DigitComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
