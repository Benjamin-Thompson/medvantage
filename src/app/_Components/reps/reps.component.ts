import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../users/authentication.service'
import { GeneralService } from '../../general.service'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { DatePickerService } from '../date-picker/date-picker.service';
declare const $: any;
@Component({
  selector: 'app-reps',
  templateUrl: './reps.component.html',
  styleUrls: ['./reps.component.css']
})
export class RepsComponent implements OnInit {
  currentRep:any = null;
  currentView:string = 'View';
  textarea:string = '';
  textareaB:string = '';
  searchText:string = '';
  finalTable:Object;
  commissionTable:any = null;
  showForm:boolean = false;
  FacilitycurrentView:string = '';
  newUser:any = {
    formName: '',
    ID: '',
    TITLE: '',
    COMMISSION: 0
  }
  newUserB:any = {
    formName: '',
    ID: '',
    REP_ID: '',
    FACILITY_ID: '',
    COMMISSION: '',
    COMMISSIONTYPE: 'GENERAL',
    UPLOAD_MONTH: '',
    UPLOAD_YEAR: '',
    SHOW_FACILITY: ''
  }  
  constructor(private http:Http, private general:GeneralService, private auth:AuthenticationService, private datePicker:DatePickerService) { }

  ngOnInit() {
    this.finalTable = this.general.Reps;
  }
  changeView(view:string) {
    this.currentView = view;
  }
  beginEdit(user) {
    this.newUser.ID = user.ID; 
    this.newUser.TITLE = user.TITLE; 
    this.newUser.COMMISSION = user.COMMISSION; 
    $("#newUserStartLocation").focus();
  }    
  beginEditB(user) {
    this.newUserB.ID = user.ID; 
    this.newUserB.REP_ID = user.REP_ID; 
    this.newUserB.FACILITY_ID = user.FACILITY_ID;   
    this.newUserB.COMMISSION = user.COMMISSION;  
    this.newUserB.COMMISSIONTYPE = user.COMMISSIONTYPE;  
    this.newUserB.UPLOAD_MONTH = user.UPLOAD_MONTH;
    this.newUserB.UPLOAD_YEAR = user.UPLOAD_YEAR;
    this.newUserB.SHOW_FACILITY = user.SHOW_FACILITY;
    $("#newUserBStartLocation").focus();  
  }

  changeRep(rep) {
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Content-Type', `application/json`);
    headers.append('Authorization', `Bearer ${this.auth.token}`);
    let options = new RequestOptions({headers: headers});       
    this.http.get(this.general.starter + '/api/v2/reps/' + rep.ID, options)
      .map(res => res.json())
      .subscribe(res => {
        this.commissionTable = res.successObject;
      }, 
      error => {alert("Invalid Action, check Console"); console.log(error);this.currentView = 'View'});      
    this.currentRep = rep;
    this.newUserB.REP_ID = this.currentRep.ID;
    this.newUserB.COMMISSION = this.currentRep.COMMISSION;
    this.FacilitycurrentView = 'ViewTable'
    this.changeView('Facilities');    

    $("#newUserBStartLocation").focus();
  }
  retrieveData(updateObject, data, router, menuService, general) {
    updateObject.searchText = '';
    updateObject.finalTable = general.Reps;
    updateObject.newUser.ID = '';
    updateObject.newUser.TITLE = '';
    updateObject.newUser.COMMISSION = '';    
  }
  bulkUpload() {
    if (this.textarea !== '' && this.textarea !== null) {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.post(this.general.starter + '/api/v2/reps', JSON.stringify({upload:this.textarea}), options)
        .map(res => res.json())
        .subscribe(res => {alert(res.success); this.general.getData(this.general.Queries.Reps,'Reps',this.retrieveData,this, null, this.general);
        this.currentView = 'View';
        $("#newUserStartLocation").focus();
    }, 
        error => {alert(error.error); console.log(error);this.currentView = 'View'});  
      this.textarea = '';        
    }
    else {
      alert('Upload Must Have Data');
    }
  }

  downloadB() {
      let headers = new Headers({ 'Accept': 'text/csv' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.get(this.general.starter + '/api/v2/reps/facilities/download', options)
        .subscribe(res => {
          let blob = new Blob([res.text()], {type: 'text/csv'});
          let url = window.URL.createObjectURL(blob);   
          window.open(url);
        }, 
        error => {alert("Invalid Request"); console.log(error);});     
  }

  download() {
      let headers = new Headers({ 'Accept': 'text/csv' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.get(this.general.starter + '/api/v2/rep/download', options)
        .subscribe(res => {
          let blob = new Blob([res.text()], {type: 'text/csv'});
          let url = window.URL.createObjectURL(blob);   
          window.open(url);
        }, 
        error => {alert("Invalid Request"); console.log(error);});     
  }

  bulkUploadB() {
    if (this.textareaB !== '' && this.textareaB !== null) {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.post(this.general.starter + '/api/v2/rep/facilities', JSON.stringify({upload:this.textareaB}), options)
        .map(res => res.json())
        .subscribe(res => {
          alert(res.success); 
          this.changeRep(this.currentRep);
          this.newUserB.ID = '';
          this.newUserB.REP_ID = this.currentRep.ID;
          this.newUserB.FACILITY_ID = '';
          this.newUserB.COMMISSION = this.currentRep.COMMISSION;
          this.newUserB.COMMISSIONTYPE = 'GENERAL';  
          this.newUserB.UPLOAD_MONTH = '';
          this.newUserB.UPLOAD_YEAR = '';
          this.newUserB.SHOW_FACILITY = 1;
          this.FacilitycurrentView = 'ViewTable';
          $("#newUserBStartLocation").focus();
        }, 
        error => {alert(error.error); console.log(error);this.currentView = 'Facilities'; this.FacilitycurrentView = 'ViewTable';});  
      this.textarea = '';        
    }
    else {
      alert('Upload Must Have Data');
    }
  }  
  removeFacility(facility) {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      this.http.delete(this.general.starter + '/api/v2/reps/' + this.currentRep.ID + '/facility/' + facility.FACILITY_ID, options)
        .map(res => res.json())
        .subscribe(res => {
          alert(res.success); 
          this.changeRep(this.currentRep);
          this.newUserB.ID = '';
          this.newUserB.REP_ID = this.currentRep.ID;
          this.newUserB.FACILITY_ID = '';
          this.newUserB.COMMISSION = this.currentRep.COMMISSION;
          this.newUserB.COMMISSIONTYPE = 'GENERAL';  
          this.newUserB.UPLOAD_MONTH = '';
          this.newUserB.UPLOAD_YEAR = '';
          this.newUserB.SHOW_FACILITY = 1;
          $("#newUserBStartLocation").focus();
    }, 
        error => {alert("Invalid"); console.log(error);this.currentView = 'Facilities'});    
  }
  saveFormB() {
    this.showForm = false;
    if (this.newUserB.TITLE !== '') {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      this.http.post(this.general.starter + '/api/v2/rep/facilities', JSON.stringify(this.newUserB), options)
        .map(res => res.json())
        .subscribe(res => {
          alert(res.success); 
          this.changeRep(this.currentRep);
          this.newUserB.ID = '';
          this.newUserB.REP_ID = this.currentRep.ID;
          this.newUserB.FACILITY_ID = '';
          this.newUserB.COMMISSION = this.currentRep.COMMISSION;
          this.newUserB.COMMISSIONTYPE = 'GENERAL'; 
          this.newUserB.UPLOAD_MONTH = '';
          this.newUserB.UPLOAD_YEAR = '';
          this.newUserB.SHOW_FACILITY = 1; 
          $("#newUserBStartLocation").focus();
    }, 
        error => {alert("Invalid"); console.log(error);this.currentView = 'Facilities'});
    }    
    else {
      alert('Facility must have a valid Name');
      this.currentView = 'Facilities'
    }    
  }
  saveForm() {
    this.showForm = false;
    if (this.newUser.TITLE !== '') {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      this.newUser['UPLOAD_MONTH'] = this.datePicker.UploadMonth.number;
      this.newUser['UPLOAD_YEAR'] = this.datePicker.UploadYear.number;
      this.http.post(this.general.starter + '/api/v2/reps', JSON.stringify(this.newUser), options)
        .map(res => res.json())
        .subscribe(res => {alert(res.success); this.general.getData(this.general.Queries.Reps,'Reps',this.retrieveData,this, null, this.general);
        $("#newUserStartLocation").focus();
    }, 
        error => {alert(error.error); console.log(error);this.currentView = 'View'}, 
        () => this.currentView = 'View');
    }    
    else {
      alert('Facility must have a valid Name');
      this.currentView = 'View'
    }
  }

  searchUsers() {
    if (this.searchText == '') {
      this.finalTable = this.general.Reps;
    }
    else {
      this.finalTable = this.general.Reps.filter(a => {
        if (a.TITLE.toLowerCase().indexOf(this.searchText.toLowerCase())  > -1) {
          return a;
        }
      })
    }
  }


}
