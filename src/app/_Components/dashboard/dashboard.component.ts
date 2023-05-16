import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../users/authentication.service'
import { GeneralService } from '../../general.service'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { DatePickerService } from '../date-picker/date-picker.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentView:string = 'Dashboard';
  activeState:number = 0;
  manual:any = [];
  reportName:string = '';
  currentRep:any = {
    ID: ''
  }
  currentRepID:number = 0;
  manualData:any = {
    REP_ID: 0,
    TITLE: '',
    DESCRIPTION: '',
    AMOUNT: 0
  }
  commissionData:any = {
    PAID_TOTAL: 0,
    COG_TOTAL: 0,
    GENERAL_COMMISSIONS: 0,
    OVERRIDE_COMMISSIONS: 0,
    MANUAL_COMMISSIONS: 0
  }
  viewData:any = []
  viewDataColumns:any = []
  constructor(private http:Http, private general:GeneralService, private auth:AuthenticationService, private datePicker:DatePickerService) { 
    this.currentRep = {
      ID: this.auth.repid,
      TITLE: this.auth.username
    };
    this.currentRepID = this.auth.repid;
    this.setCurrentRep();
    let me = this;
    this.datePicker.updateFunction = function() {
      me.setCurrentRep();
    }    
  }

  ngOnInit() {
    this.currentRep = {
      ID: this.auth.repid,
      TITLE: this.auth.username
    };    
    this.currentRepID = this.auth.repid;
    this.setCurrentRep();
    let me = this;
    this.datePicker.updateFunction = function() {
      me.setCurrentRep();
    }    
  }

  formatData(data) {
    let newData = '';
    try {
      if (!isNaN(data)) {
        newData = data.toFixed(2).replace(/./g, function(c, i, a) {
          return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        }); 
        newData = '$' + newData.toString(); 
      } 
      else {
        if (data.indexOf("T00:00:00.000Z") > -1) {
          newData = data.replace("T00:00:00.000Z", "");
        }
        else {
          newData = data;
        }
      } 
    }
    catch(e) {
      newData = data;
    }
    return newData;
  }

  setCurrentRep(id?:number) {
    let me = this;
    if (id) {
      me.currentRepID = id;
    }
    else {
      me.currentRepID = me.auth.repid;
    }
    setTimeout(function() {
      if (me.general.Reps) {
        let rep = me.general.Reps.filter(a => {
          if (a.ID == me.currentRepID)
          {
            return a;
          }
        });
        if (rep) {
          if (rep[0]) {
            me.currentRep = rep[0]; 
          }
        }
      }
      me.viewActiveState();
      me.getCommissionData();    
      me.getManualData(); 
    }, 1000);   
  }

  newManualEntry() {
    if (this.manualData.TITLE !== '') {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      this.manualData['month'] = this.datePicker.UploadMonth.number;
      this.manualData['year'] = this.datePicker.UploadYear.number;
      this.http.post(this.general.starter + '/api/v2/dashboard/manual/' + this.currentRep.ID, JSON.stringify(this.manualData), options)
        .map(res => res.json())
        .subscribe(res => {
          alert("Added Manual Entry");
          this.getManualData();
          this.getCommissionData();
          this.viewDataColumns = []; this.viewData = []; this.reportName = '';
      }, 
        error => {alert("Invalid Request"); console.log(error);this.currentView = 'View'});
    }    
    else {
      alert('Data must have a valid Title');
    }
  }

  removeManualEntry(manual) {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      this.http.delete(this.general.starter + '/api/v2/dashboard/manual/' + manual.ID, options)
        .map(res => res.json())
        .subscribe(res => {
          alert("Removed Manual Entry");
          this.getManualData();
          this.getCommissionData();
      }, 
        error => {alert("Invalid Request"); console.log(error);this.currentView = 'View'});    
  }

  getManualData() {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers}); 
      options.withCredentials = false;  
      if (this.currentRep) {
        this.http.get(this.general.starter + `/api/v2/dashboard/manual/${this.currentRep.ID}?month=${this.datePicker.UploadMonth.number}&year=${this.datePicker.UploadYear.number}`, options)
            .map(response => response.json())
            .subscribe(response => {
                this.manual = response.successObject;
            }, error => {
                console.log(error);
            });
      }
  }

  downloadPaidBDS() {
      let headers = new Headers({ 'Accept': 'text/csv' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.get(this.general.starter + '/api/v2/paid/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
        .subscribe(res => {
          let blob = new Blob([res.text()], {type: 'text/csv'});
          let url = window.URL.createObjectURL(blob);   
          window.open(url);
        }, 
        error => {alert("Invalid Request"); console.log(error);});     
  }

  downloadCOGS() {
      let headers = new Headers({ 'Accept': 'text/csv' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.get(this.general.starter + '/api/v2/cogs/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
        .subscribe(res => {
          let blob = new Blob([res.text()], {type: 'text/csv'});
          let url = window.URL.createObjectURL(blob);   
          window.open(url);
        }, 
        error => {alert("Invalid Request"); console.log(error);});     
  }
  downloadCOMMISSION() {
      let headers = new Headers({ 'Accept': 'text/csv' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.get(this.general.starter + '/api/v2/commission/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
        .subscribe(res => {
          let blob = new Blob([res.text()], {type: 'text/csv'});
          let url = window.URL.createObjectURL(blob);   
          window.open(url);
        }, 
        error => {alert("Invalid Request"); console.log(error);});     
  }  

  downloadPaidReps() {
    let headers = new Headers({ 'Accept': 'text/csv' });
    headers.append('Content-Type', `application/json`);
    headers.append('Authorization', `Bearer ${this.auth.token}`);
    let options = new RequestOptions({headers: headers});   
    this.http.get(this.general.starter + '/api/v2/paidrep/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
      .subscribe(res => {
        let blob = new Blob([res.text()], {type: 'text/csv'});
        let url = window.URL.createObjectURL(blob);   
        window.open(url);
      }, 
      error => {alert("Invalid Request"); console.log(error);});     
  }  

  downloadCogsReps() {
    let headers = new Headers({ 'Accept': 'text/csv' });
    headers.append('Content-Type', `application/json`);
    headers.append('Authorization', `Bearer ${this.auth.token}`);
    let options = new RequestOptions({headers: headers});   
    this.http.get(this.general.starter + '/api/v2/cogrep/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
      .subscribe(res => {
        let blob = new Blob([res.text()], {type: 'text/csv'});
        let url = window.URL.createObjectURL(blob);   
        window.open(url);
      }, 
      error => {alert("Invalid Request"); console.log(error);});     
  } 

  downloadCOMMISSIONDetail() {
    let headers = new Headers({ 'Accept': 'text/csv' });
    headers.append('Content-Type', `application/json`);
    headers.append('Authorization', `Bearer ${this.auth.token}`);
    let options = new RequestOptions({headers: headers});   
    this.http.get(this.general.starter + '/api/v2/commissiondetail/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
      .subscribe(res => {
        let blob = new Blob([res.text()], {type: 'text/csv'});
        let url = window.URL.createObjectURL(blob);   
        window.open(url);
      }, 
      error => {alert("Invalid Request"); console.log(error);}); 
  }

  downloadPaidVsCogs() {
    let headers = new Headers({ 'Accept': 'text/csv' });
    headers.append('Content-Type', `application/json`);
    headers.append('Authorization', `Bearer ${this.auth.token}`);
    let options = new RequestOptions({headers: headers});   
    this.http.get(this.general.starter + '/api/v2/paidvscogs/download?month=' + this.datePicker.UploadMonth.number + "&year=" + this.datePicker.UploadYear.number, options)
      .subscribe(res => {
        let blob = new Blob([res.text()], {type: 'text/csv'});
        let url = window.URL.createObjectURL(blob);   
        window.open(url);
      }, 
      error => {alert("Invalid Request"); console.log(error);});     
  }

  downloadFacilitiesWithRep() {
    let headers = new Headers({ 'Accept': 'text/csv' });
    headers.append('Content-Type', `application/json`);
    headers.append('Authorization', `Bearer ${this.auth.token}`);
    let options = new RequestOptions({headers: headers});   
    this.http.get(this.general.starter + '/api/v2/facility_reps/download', options)
      .subscribe(res => {
        let blob = new Blob([res.text()], {type: 'text/csv'});
        let url = window.URL.createObjectURL(blob);   
        window.open(url);
      }, 
      error => {alert("Invalid Request"); console.log(error);}); 
  }

  downloadCustomReport(queryId) {
    let headers = new Headers({ 'Accept': 'text/csv' });
    headers.append('Content-Type', `application/json`);
    headers.append('Authorization', `Bearer ${this.auth.token}`);
    let options = new RequestOptions({headers: headers});   
    this.http.get(this.general.starter + '/api/v2/paid/customdownload?Id=${queryId}' , options)
      .subscribe(res => {
        let blob = new Blob([res.text()], {type: 'text/csv'});
        let url = window.URL.createObjectURL(blob);   
        window.open(url);
      }, 
      error => {alert("Invalid Request"); console.log(error);});     
  }



  viewActiveState() {
      this.activeState = 3;
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      this.http.get(this.general.starter + `/api/v2/dashboard/activestate?month=${this.datePicker.UploadMonth.number}&year=${this.datePicker.UploadYear.number}`, options)
        .map(res => res.json())
        .subscribe(res => {
          this.activeState = Number(res.activeState.ISACTIVE);
      }, 
        error => {alert("Invalid Request"); console.log(error);});  
  }

  setActiveState(isActive) {
      this.activeState = 3;
      let data = {
        isActive: isActive,
        month: this.datePicker.UploadMonth.number,
        year: this.datePicker.UploadYear.number
      }
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});     
      let me = this;  
      this.http.post(this.general.starter + `/api/v2/dashboard/activestate`, JSON.stringify(data), options)
        .map(res => res.json())
        .subscribe(res => {
          this.activeState = Number(res.activeState[0].ISACTIVE);
      }, 
        error => {alert("Invalid Request"); console.log(error);});    
  }  

  getCommissionData() {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      if (this.currentRep) {
        this.http.get(this.general.starter + `/api/v2/dashboard/detail/${this.currentRep.ID}?month=${this.datePicker.UploadMonth.number}&year=${this.datePicker.UploadYear.number}`, options)
          .map(res => res.json())
          .subscribe(res => {
            if (res.successObject) {
              this.commissionData = res.successObject;
            }
            else {
              this.commissionData = {
                PAID_TOTAL: 0,
                COG_TOTAL: 0,
                GENERAL_COMMISSIONS: 0,
                OVERRIDE_COMMISSIONS: 0,
                MANUAL_COMMISSIONS: 0
              }
            }
            
        }, 
          error => {alert("Invalid Request"); console.log(error);});     
      } 
      else {
        this.http.get(this.general.starter + `/api/v2/dashboard/detail/${this.auth.repid}?month=${this.datePicker.UploadMonth.number}&year=${this.datePicker.UploadYear.number}`, options)
          .map(res => res.json())
          .subscribe(res => {
            if (res.successObject) {
              this.commissionData = res.successObject;
            }
            else {
              this.commissionData = {
                PAID_TOTAL: 0,
                COG_TOTAL: 0,
                GENERAL_COMMISSIONS: 0,
                OVERRIDE_COMMISSIONS: 0,
                MANUAL_COMMISSIONS: 0
              }
            }
        }, 
          error => {alert("Invalid Request"); console.log(error);});            
      }
  }  

  showDetail(type, detailView, reportName) {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      let query =     
      this.http.get(this.general.starter + `/api/v2/dashboard/detail/${this.currentRep.ID}/${type}?type=${(detailView) ? 'detail' : 'summary'}&month=${this.datePicker.UploadMonth.number}&year=${this.datePicker.UploadYear.number}`, options)
        .map(res => res.json())
        .subscribe(res => {
          this.viewDataColumns = [];
          this.viewData = [];
          this.reportName = reportName;
          for (let column in res.successObject[0]) {
            this.viewDataColumns.push(column);
          }
          this.viewData = res.successObject;
      }, 
        error => {alert("Invalid Request"); console.log(error);});       
  }
}

