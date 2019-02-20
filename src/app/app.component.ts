import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { RecordModel } from './record-model';
import { Subject, fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

enum ActionType {
  Delete = 'DELETE',
  Add = 'ADD'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public timeRecords: RecordModel[] = [];
  private isDestroyed = new Subject<void>();
  public storageChanges$ = fromEvent(window, "storage");

  @HostListener("window:unload", ["$event"])
  unloadHandler(event) {
    localStorage.setItem('records', JSON.stringify(this.timeRecords));
  }

  public ngOnInit() {

    let savedValues = JSON.parse(localStorage.getItem('records'));
    if (savedValues) {
      this.timeRecords = savedValues;
    }

    this.storageChanges$
      .pipe(
        filter((event: StorageEvent) => {
         return event.key == 'recordsAction' && !!event.newValue
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
    localStorage.setItem('recordsAction', '');
    localStorage.setItem('recordsAction', JSON.stringify({type: ActionType.Add, time: time}));
    localStorage.setItem('records', JSON.stringify(this.timeRecords));
  }

  public deleteRecord(id: number) {
    this.timeRecords.splice(id, 1);
    localStorage.setItem('recordsAction', '');
    localStorage.setItem('recordsAction', JSON.stringify({type: ActionType.Delete, id: id}));
    localStorage.setItem('records', JSON.stringify(this.timeRecords));
  }

  public ngOnDestroy(): void {
    this.isDestroyed.next();
  }
}
