import { Component, OnInit } from '@angular/core';
import { DatePickerService, Month, Year } from './date-picker.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})

export class DatePickerComponent implements OnInit {

  constructor(private DatePicker:DatePickerService) { }

  ngOnInit() {
    this.DatePicker.initialize();
  }

}
