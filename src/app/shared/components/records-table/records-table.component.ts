import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecordModel } from '@shared/models/record-model';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.scss']
})
export class RecordsTableComponent implements OnInit {

  @Input() records: RecordModel[];
  @Output() delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public deleteRecord(id: number) {
    this.delete.emit(id - 1);
  }

}
