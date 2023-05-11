import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../users/authentication.service'
import { GeneralService } from '../../general.service'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { DatePickerService } from '../date-picker/date-picker.service';
declare const $: any;
@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  currentBiller:any = null;
  currentReport:any = null;
  columnMapping:any = [];
  unmappedData:any = [];
  alarm:any = {
    text: '',
    isLoading: false,
    status: '',
    alertType: 'info',
    totalAmount: null
  }
  constructor(private http:Http, private general:GeneralService, private auth:AuthenticationService, private datePicker:DatePickerService) { }

  ngOnInit() {
  }
  setCurrentReport() {
    let reports = this.general.Reports.filter(a => {
      if (a.ID == this.currentBiller.REPORT_ID)
       {
         return a;
       }
    });
    this.currentReport = reports[0];    
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Content-Type', `application/json`);
    headers.append('Authorization', `Bearer ${this.auth.token}`);
    let options = new RequestOptions({headers: headers});       
    this.http.get(this.general.starter + '/api/v2/columns/' + this.currentReport.ID, options)
      .map(res => res.json())
      .subscribe(res => {
        this.columnMapping = res.successObject;
      }, 
      error => {alert("Invalid Action, check Console"); console.log(error);}); 

  }
  updateCurrentBiller(isCogs, biller?) {
    if (isCogs) {
      this.currentBiller = {TITLE: 'COGS', REPORT_ID: 1};
      console.log(this.currentBiller.REPORT_ID);
    }
    else {
      this.currentBiller = biller;
      console.log(this.currentBiller.REPORT_ID);
      if (this.currentBiller.REPORT_ID == null || this.currentBiller.REPORT_ID == '' || this.currentBiller.REPORT_ID == "undefined") {
        this.currentBiller.REPORT_ID = 1;
      }
    }
    this.setCurrentReport();
  }

  saveReport() {
    if (this.currentReport.TITLE !== '') {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      this.http.put(this.general.starter + '/api/v2/reports/' + this.currentReport.ID, JSON.stringify(this.currentReport), options)
        .map(res => res.json())
        .subscribe(res => {
          alert(res.success); 
          this.setCurrentReport();
    }, 
        error => {alert("Invalid"); console.log(error);});
    }    
    else {
      alert('Report must have a valid Name');
    }       
  }

  bulkUploadFacilityMapping() {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.post(this.general.starter + '/api/v2/facilitiesMap', JSON.stringify({upload:this.unmappedData}), options)
        .map(res => res.json())
        .subscribe(res => {
          alert(res.success); 
          this.mapFacilities();
      }, 
      error => {alert("Invalid Request"); console.log(error);});     
  }

  updateColumnMapping(column) {
    this.alarm.totalAmount = null;     
    if (column.RAW_COLUMN_NAME !== '') {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      this.http.put(this.general.starter + '/api/v2/columns/' + column.ID, JSON.stringify(column), options)
        .map(res => res.json())
        .subscribe(res => {
          alert(res.success); 
    }, 
        error => {alert("Invalid"); console.log(error);});
    }    
    else {
      alert('Column must have a valid Name');
    }       
  }
  mapFacilities() {
    this.alarm.totalAmount = null;     
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      let data = {
        month: this.datePicker.UploadMonth.number,
        year: this.datePicker.UploadYear.number,
        title: this.currentBiller.TITLE
      }    
      this.http.post(this.general.starter + `/api/v2/uploads/${this.currentBiller.ID}/mapFile?isCogs=${(this.currentBiller.TITLE == 'COGS') ? 'yes' : 'no'}`, JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe(res => {
            console.log(res);
            let dataMapped = false;
            if (res.unmappedItems) {
              if (res.unmappedItems[0][0] == null) {
                dataMapped = true;
              }
            }
            else {
              dataMapped = true;
            }
            if (dataMapped) {
              this.unmappedData = [];
              this.alarm.text = "All facilities have been successfully mapped based on the Facility Legend. Please wait as we load data to Database";
              this.alarm.isLoading = true;
              this.alarm.status = "Facility/Rep Mapping";
              this.alarm.alertType = "success";  
              this.pushToDatabase();
            }
            else {
              this.alarm.text = "Please review all unmapped facilities below. You can not continue.";
              this.alarm.isLoading = true;
              this.alarm.status = "Unmapped Facilities/Reps";
              this.alarm.alertType = "warning"; 
              this.unmappedData = res.unmappedItems[0];               
            }
 
    }, 
        error => {
          console.log(error);
          this.alarm.text = "There was an error when mapping facilities. This was not caused by Unmapped Facilities";
          this.alarm.isLoading = true;
          this.alarm.status = "Facility/Rep Mapping";
          this.alarm.alertType = "danger";              
        });    
  }

  pushToDatabase() {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      let data = {
        month: this.datePicker.UploadMonth.number,
        year: this.datePicker.UploadYear.number,
        title: this.currentBiller.TITLE
      }    
      this.http.post(this.general.starter + `/api/v2/uploads/${this.currentBiller.ID}/pushToDatabase?isCogs=${(this.currentBiller.TITLE == 'COGS') ? 'yes' : 'no'}`, JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe(res => {
            console.log(res);
            this.general.getData(this.general.Queries.Billers,'Billers',null,this, null, this.general)
            this.unmappedData = [];
            this.alarm.text = "Data has been succefully pushed. Total Amount:";
            this.alarm.totalAmount = res.paidTotal[0].PAID_AMOUNT;
            this.alarm.isLoading = true;
            this.alarm.status = "Successful Upload:";
            this.alarm.alertType = "success";

    }, 
        error => {
          console.log(error);
          this.alarm.text = "There was an error while pushing your data to the Database";
          this.alarm.isLoading = true;
          this.alarm.status = "Database Push";
          this.alarm.alertType = "danger";         
          this.alarm.totalAmount = null;     
        });
  }

  uploadReport() {
      this.alarm.isLoading = false;
      this.alarm.totalAmount = null;     
      const myFiles = (<HTMLInputElement>document.getElementById("uploadFile"));
      const files = myFiles.files;
      if (files[0]) {
        this.alarm.isLoading = true;
        this.alarm.text = "Please wait.... ";
        this.alarm.isLoading = true;
        this.alarm.status = "Loading File";
        this.alarm.alertType = "info";          
        var form = new FormData();
        form.append("uploadFiles", files[0], files[0].name);
        let headers = new Headers({ 'Accept': 'application/json' });
        //headers.append('Content-Type', `multipart/form-data`);
        headers.append('Authorization', `Bearer ${this.auth.token}`);
        let options = new RequestOptions({headers: headers});       
        this.http.post(this.general.starter + `/api/v2/uploads/schemaCheck?biller=${this.currentBiller.TITLE}&sheetNumber=${this.currentReport.SHEET_NUMBER}&startRow=${this.currentReport.START_ROW}&billerID=${this.currentBiller.ID}&reportID=${this.currentReport.ID}&month=${this.datePicker.UploadMonth.number}&year=${this.datePicker.UploadYear.number}&isCogs=${(this.currentBiller.TITLE == 'COGS') ? 'yes' : 'no'}`,
        form, options)
          .map(res => res.json())
          .subscribe(res => {
            console.log(res);
            this.alarm.text = "The schema of this file has been validated. Please Wait as we Map Facilities";
            this.alarm.isLoading = true;
            this.alarm.status = "Schema Check";
            this.alarm.alertType = "success";     
            this.mapFacilities();
        }, 
        error => {
          console.log(error);
          this.alarm.text = "The schema of this file does not match as expected. Check the Column Mappings";
          this.alarm.isLoading = true;
          this.alarm.status = "Schema Check";
          this.alarm.alertType = "danger";            
        });
    }
    else {
      alert("Can not upload a blank file!");
      this.alarm.text = "No file to upload";
      this.alarm.isLoading = true;
      this.alarm.status = "Bad File Uploaded";
      this.alarm.alertType = "danger";    
    }    
  }
}
