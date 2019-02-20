import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clock-display',
  templateUrl: './clock-display.component.html',
  styleUrls: ['./clock-display.component.scss']
})
export class ClockDisplayComponent implements OnInit {

  @Input() currentTime: number;

  constructor() { }

  ngOnInit() {
  }

  public isTimeSecondOdd(time) {
    return Math.floor(time / 1000) % 2 === 0;
  }

  public get firstMinutesDigit() {
    return Math.floor((this.currentTime / 60000)) / 10;
  }

  public get secondMinutesDigit() {
    return Math.floor((this.currentTime / 60000)) % 10;
  }

  public get firstSecondsDigit() {
    return Math.floor(Math.floor(this.currentTime % 60000) / 10000);
  }

  public get secondSecondsDigit() {
    return Math.floor((this.currentTime / 1000) % 10);
  }

  public get firstMillisecondsDigit() {
    return Math.floor((this.currentTime % 1000) / 100);
  }

  public get secondMillisecondsDigit() {
    return Math.floor((this.currentTime % 100) / 10);
  }

}
