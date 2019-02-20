import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-digit',
  templateUrl: './digit.component.html',
  styleUrls: ['./digit.component.scss']
})
export class DigitComponent implements OnInit {

  @Input() digit: number;

  public topLeftDigits = [0, 4, 5, 6, 8, 9];
  public topTopDigits = [0, 2, 3, 5, 6, 7, 8, 9];
  public topRightDigits = [0, 1, 2, 3, 4, 7, 8, 9];
  public middleDigits = [2, 3, 4, 5, 6, 8, 9];
  public bottomLeftDigits = [0, 2, 6, 8];
  public bottomBottomDigits = [0, 2, 3, 5, 6, 8];
  public bottomRightDigits = [0, 1, 3, 4, 5, 6, 7, 8, 9];

  constructor() { }

  ngOnInit() {
  }

}
