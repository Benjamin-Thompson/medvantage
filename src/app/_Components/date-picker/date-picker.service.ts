import { Injectable } from '@angular/core';

@Injectable()

export class Month {
  title:string;
  number:number;
  jsnumber:number;
  isSelected:boolean;
  constructor(title:string, number:number, jsnumber:number) {
    this.title = title;
    this.number = number;
    this.jsnumber = jsnumber;
    this.isSelected = false;
  }
}
export class Year {
  title:string;
  number:number;
  jsnumber:number;
  isSelected:boolean;
  constructor(title:string, number:number, jsnumber:number) {
    this.title = title;
    this.number = number;
    this.jsnumber = jsnumber;
    this.isSelected = false;
  }  
}

export class DatePickerService {
  Months:Array<Month> = new Array<Month>();
  Years:Array<Year> = new Array<Year>();
  UploadMonth:Month;
  UploadYear:Year;
  selectedMonth:string;
  selectedYear:string;
  updateFunction:any;
  constructor() { }
  initialize() {
    let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    let date = new Date();
    let year = date.getFullYear();
    let currentMonth = date.getMonth();
    let lastUploadDate = new Date(year, currentMonth - 1, 1);
    let startyear = 2017;
    let endyear = year + 2;  
    let i = 0;
    for (let month of months) {
      let thisMonth = new Month(month, i + 1, i);
      if (thisMonth.jsnumber == lastUploadDate.getMonth()) {
        thisMonth.isSelected = true;
        this.UploadMonth = thisMonth;
        this.selectedMonth = this.UploadMonth.title;
      }
      this.Months.push(thisMonth);
      i++;
    }
    while (startyear <= endyear) {
      let thisYear = new Year(startyear.toString(), startyear, startyear);
      if (thisYear.jsnumber == lastUploadDate.getFullYear()) {
        thisYear.isSelected = true;
        this.UploadYear = thisYear;
        this.selectedYear = this.UploadYear.title;
      }      
      this.Years.push(thisYear);
      startyear++;
    }
  }
  changeDate(month?:string, year?:string):void {
    if (month) {
      let thisMonth = this.Months.filter(function(a) {
        if (a.title == month) {
          return a;
        }
      });
      this.UploadMonth = thisMonth[0];
      this.selectedMonth = this.UploadMonth.title;
    }
    if (year) {
      let thisYear = this.Years.filter(function(a) {
        if (a.title == year) {
          return a;
        }
      });
      this.UploadYear = thisYear[0];
      this.selectedYear = this.UploadYear.title;
    }
    if (this.updateFunction) this.updateFunction();
  }
}
