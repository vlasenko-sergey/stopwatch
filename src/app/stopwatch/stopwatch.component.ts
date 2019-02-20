import { Component, OnInit, HostListener, OnDestroy, EventEmitter, Output } from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { StopwatchService } from "../stopwatch.service";

enum ActionType {
  Run = "RUN",
  Pause = "PAUSE",
  Clear = "CLEAR",
}

enum Status {
  On = "ON",
  Off = "OFF",
}

@Component({
  selector: "app-stopwatch",
  templateUrl: "./stopwatch.component.html",
  styleUrls: ["./stopwatch.component.scss"]
})
export class StopwatchComponent implements OnInit, OnDestroy {
  public Status = Status;

  public currentTime = 0;
  public isRunning = false;

  private isDestroyed = new Subject<void>();
  private stopTimer = new Subject<void>();
  public storageChanges$ = fromEvent(window, "storage");

  @Output()
  public saveRecord = new EventEmitter<number>();

  constructor(private stopwatchService: StopwatchService) {}

  private saveCurrentTime() {
    localStorage.setItem("currentTime", this.currentTime.toString());
  }

  @HostListener("window:unload", ["$event"])
  unloadHandler(event) {
    this.saveCurrentTime();
    localStorage.setItem("lastTime", Date.now().toString());
  }

  ngOnInit() {
    let savedTime = localStorage.getItem("currentTime");
    let lastTime = localStorage.getItem("lastTime");
    let savedStatus = localStorage.getItem("status");
    if (savedTime && lastTime) {
      if (savedStatus && savedStatus ===  Status.On) {
        this.currentTime = Number.parseInt(savedTime) + Date.now() - Number.parseInt(lastTime);
      } else {
        this.currentTime = Number.parseInt(savedTime);
      }
      
      this.stopwatchService.loadCurrentTime(this.currentTime);
    }

    if (savedStatus) {
      this.toggleTimer(savedStatus);
    }

    this.storageChanges$
      .pipe(
        filter((event: StorageEvent) => event.key == 'action'),
        takeUntil(this.isDestroyed)
        )
      .subscribe((event: StorageEvent) => {
        this.currentTime = Number.parseInt(localStorage.getItem('currentTime'));
        switch (event.newValue) {
          case ActionType.Run:
            this.toggleTimer(Status.On);
            break;
          case ActionType.Pause:
            this.toggleTimer(Status.Off);
            break;
          case ActionType.Clear:
            this.toggleTimer(Status.Off);
            this.stopTimer.next();
            this.stopwatchService.clear();
            this.currentTime = 0;
            break;
        }
      });
  }

  public toggleTimer(status) {
    this.isRunning = status ===  Status.On;
    this.saveCurrentTime();
    if (this.isRunning) {
      localStorage.setItem('status', Status.On);
      localStorage.setItem('action', ActionType.Run);
      this.stopwatchService.currentTime$
        .pipe(
          takeUntil(this.isDestroyed),
          takeUntil(this.stopTimer)
        )
        .subscribe(currentTime => {
          this.currentTime = currentTime;
        });
    } else {
      localStorage.setItem('status', Status.Off);
      localStorage.setItem('action', ActionType.Pause);
      this.stopTimer.next();
    }
  }

  public clearTimer() {
    this.isRunning = false;
    this.stopTimer.next();
    this.stopwatchService.clear();
    this.currentTime = 0;
    this.saveCurrentTime();
    localStorage.setItem('action', ActionType.Clear);
  }

  public saveTimeRecord() {
    this.saveRecord.emit(this.currentTime);
  }

  ngOnDestroy(): void {
    this.saveCurrentTime();
    this.isDestroyed.next();
  }
}
