import { Component, OnDestroy, OnInit, HostListener } from "@angular/core";
import { RecordModel } from "../../models/record-model";
import { Subject, fromEvent } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

//Тип действия над записями (для сохранения в storage)
enum ActionType {
  Delete = "DELETE",
  Add = "ADD"
}

/**
 * Объединяет таймер и работу с записями времени. 
 * Полностью реализует логику работы с записями времени.
 */
@Component({
  selector: "app-stopwatch-with-records",
  templateUrl: "./stopwatch-with-records.component.html",
  styleUrls: ["./stopwatch-with-records.component.scss"]
})
export class StopwatchWithRecordsComponent implements OnInit, OnDestroy {
  public timeRecords: RecordModel[] = [];
  private isDestroyed = new Subject<void>();
  public storageChanges$ = fromEvent(window, "storage");

  //Сохранение данных перед закрытием
  @HostListener("window:unload", ["$event"])
  unloadHandler(event) {
    localStorage.setItem("records", JSON.stringify(this.timeRecords));
  }

  public ngOnInit() {
    //Загрузка начального состояния из storage
    let savedValues = JSON.parse(localStorage.getItem("records"));
    if (savedValues) {
      this.timeRecords = savedValues;
    }

    //Подписываемся на события storage и обрабатываем полученные типы событий от других окон
    this.storageChanges$
      .pipe(
        filter((event: StorageEvent) => {
          return event.key == "recordsAction" && !!event.newValue;
        }),
        takeUntil(this.isDestroyed)
      )
      .subscribe((event: StorageEvent) => {
        let newAction = JSON.parse(event.newValue);

        switch (newAction.type) {
          case ActionType.Add:
            this.timeRecords.push(new RecordModel(newAction.time));
            break;
          case ActionType.Delete:
            this.timeRecords.splice(newAction.id, 1);
            break;
        }
      });
  }

  public addRecord(time) {
    this.timeRecords.push(new RecordModel(time));
    localStorage.setItem("recordsAction", "");
    localStorage.setItem(
      "recordsAction",
      JSON.stringify({ type: ActionType.Add, time: time })
    );
    localStorage.setItem("records", JSON.stringify(this.timeRecords));
  }

  public deleteRecord(id: number) {
    this.timeRecords.splice(id, 1);
    localStorage.setItem("recordsAction", "");
    localStorage.setItem(
      "recordsAction",
      JSON.stringify({ type: ActionType.Delete, id: id })
    );
    localStorage.setItem("records", JSON.stringify(this.timeRecords));
  }

  public ngOnDestroy(): void {
    this.isDestroyed.next();
  }
}
