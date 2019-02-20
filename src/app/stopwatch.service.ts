import { Injectable } from '@angular/core';
import { fromEvent, Observable, interval } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {

  private startTime = 0;
  private currentTimeValue = 0;
  public currentTime$ = interval(1).pipe(
    map(time => {
      if (time == 0) {
        this.startTime = Date.now() - this.currentTimeValue;
      }
      this.currentTimeValue = Date.now() - this.startTime;
      return this.currentTimeValue;
    })
  );

  constructor() { }

  public clear() {
    this.currentTimeValue = 0;
  }

  public loadCurrentTime(newCurrentTime) {
    this.currentTimeValue = newCurrentTime;
  }
}
