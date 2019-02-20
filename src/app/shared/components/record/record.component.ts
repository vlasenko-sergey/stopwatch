import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecordModel } from '../../models/record-model';

/**
 * Отображает одну запись времени
 */
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  @Input() id: number;
  @Input() record: RecordModel;

  @Output() 
  public delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public deleteRecord() {
    this.delete.emit(this.id);
  }

}
