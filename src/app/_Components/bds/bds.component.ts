import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../users/authentication.service'
import { GeneralService } from '../../general.service'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
declare const $: any;
@Component({
  selector: 'app-bds',
  templateUrl: './bds.component.html',
  styleUrls: ['./bds.component.css']
})
export class BDSComponent implements OnInit {

  constructor(private http:Http, private general:GeneralService, private auth:AuthenticationService) { }

  currentView:string = 'NewBDS';
  isViewingItem:boolean = false;
  textarea:string = '';
  showForm:boolean = false;
  searchText:string = '';
  finalTable:any = [];
  BDSDashboard:any =[];
  BDSColumns:Array<string> = new Array<string>();
  NewBDSObject:any = {
      formName: '',
      'BILLER':'',
      'FACILITY':'',
      'PATIENT_LAST_NAME':'',
      'PATIENT_FIRST_NAME':'',
      'DATE_OF_SERVICE':'',
      'SCAN_DATE':'',
      'IF_OR_HOME':'IF',
      'INSURANCE':'',
      'TAKEHOMESERIAL': ''   
  };
  BDSItems = [];
  ngOnInit() {
    this.BDSColumns = [
      'BILLER',
      'FACILITY',
      'PATIENT_LAST_NAME',
      'PATIENT_FIRST_NAME',
      'DATE_OF_SERVICE',
      'SCAN_DATE',
      'IF_OR_HOME',
      'INSURANCE',
      'TAKEHOMESERIAL'
    ];
    let me = this;
    setTimeout(function() {
      me.finalTable = me.general.BDS;
      me.BDSDashboard = me.general.BDSDashboard;
    }, 1500);
  }

  downloadFacilityWarning() {
      let headers = new Headers({ 'Accept': 'text/csv' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.get(this.general.starter + '/api/v2/bdserrors', options)
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
      this.http.get(this.general.starter + '/api/v2/bds/download', options)
        .subscribe(res => {
          let blob = new Blob([res.text()], {type: 'text/csv'});
          let url = window.URL.createObjectURL(blob);   
          window.open(url);
        }, 
        error => {alert("Invalid Request"); console.log(error);});     
  }  

  clearForm() {
    this.NewBDSObject.ID = '';
    this.NewBDSObject.PATIENT_FIRST_NAME = '';
    this.NewBDSObject.PATIENT_LAST_NAME = '';
    this.NewBDSObject.INSURANCE = '';
    this.NewBDSObject.TAKEHOMESERIAL = '';    
    $("#selectable").focus(); 
  }
  retrieveData(updateObject, data, router, menuService, general) {
    updateObject.NewBDSObject.PATIENT_FIRST_NAME = '';
    updateObject.NewBDSObject.PATIENT_LAST_NAME = '';
    updateObject.NewBDSObject.INSURANCE = '';
    updateObject.NewBDSObject.TAKEHOMESERIAL = '';
    updateObject.finalTable = general.BDS;
    updateObject.BDSDashboard = general.BDSDashboard;
    $("#selectable").focus();    
  }

  searchBDS(seachText = '', searchColumn = '', offset = 0, isMine:boolean = false) {
    this.general.bdsFilterColumn = searchColumn;
    this.general.bdsFilterString = seachText;
    this.general.bdsOffset = offset;      
    let bds = '/api/v2/bds?'
    bds += (isMine) ? 'mybds=y&' : '';
    this.general.Queries.BDS = `${bds}offset=${this.general.bdsOffset}&limit=500&filterColumn=${this.general.bdsFilterColumn}&filterString=${this.general.bdsFilterString}`;
    this.general.getData(this.general.Queries.BDS,'BDS',this.retrieveData,this, null, this.general);
  }

  dateConvertor(date:Date) {
    let month = date.getMonth();
    let year = date.getFullYear();
    let day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  addNewItem() {
    let bds = {};
    for (let prop in this.NewBDSObject) {
      bds[prop] = this.NewBDSObject[prop];
    }
    this.BDSItems.push(bds);
  }

  replaceItem(item) {
    for (let prop in item) {
      
      if (prop == 'BILLER_ID') {
      this.NewBDSObject.BILLER = item.BILLER_ID;
      }
      else if (prop == 'FACILITY_ID') {
      this.NewBDSObject.FACILITY = item.FACILITY_ID;
      }
      else if (prop == 'DATE_OF_SERVICE' || prop == 'SCAN_DATE') {
      let spDT = item[prop].split("T");
      this.NewBDSObject[prop] = spDT[0];
      }
      else {
        this.NewBDSObject[prop] = item[prop];
      }
    }
    this.isViewingItem = true;
  }  

  deleteItem(item) {
      this.isViewingItem = false;
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.delete(this.general.starter + '/api/v2/bds/' + item.ID, options)
        .map(res => res.json())
        .subscribe(res => {
          alert(res.success); 
          this.general.getData(this.general.Queries.BDSDashboard,'BDSDashboard',this.retrieveData,this, null, this.general);
          this.general.getData(this.general.Queries.BDS,'BDS',this.retrieveData,this, null, this.general);
        },
        error => {alert("Invalid Action. Check Console!"); console.log(error);this.currentView = 'NewBDS'}, 
        () => this.currentView = 'NewBDS');      
  }   

  downloadBDS() {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.delete(this.general.starter + '/api/v2/download/bds', options)
        .map(res => res.json())
        .subscribe(res => {alert(res.success); this.currentView='NewBDS'},
        error => {alert(error.error); console.log(error);this.currentView = 'NewBDS'}, 
        () => this.currentView = 'NewBDS');      
  }   

  bulkUpload() {
    if (this.textarea !== '' && this.textarea !== null) {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.post(this.general.starter + '/api/v2/bds', JSON.stringify({upload:this.textarea}), options)
        .map(res => res.json())
        .subscribe(res => {alert(res.success); this.general.getData(this.general.Queries.BDS,'BDS',this.retrieveData,this, null, this.general);}, 
        error => {alert(error.error); console.log(error);this.currentView = 'NewBDS'}, 
        () => this.currentView = 'NewBDS');  
      this.textarea = '';        
    }
    else {
      alert('Upload Must Have Data');
    }
  }
  saveForm() {
    this.showForm = false;
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Content-Type', `application/json`);
    headers.append('Authorization', `Bearer ${this.auth.token}`);
    let options = new RequestOptions({headers: headers});       
    if (this.NewBDSObject.ID == null || this.NewBDSObject.ID == "") {
      this.http.post(this.general.starter + '/api/v2/bds', JSON.stringify(this.NewBDSObject), options)
        .map(res => res.json())
        .subscribe(res => {
          this.general.getData(this.general.Queries.BDSDashboard,'BDSDashboard',this.retrieveData,this, null, this.general);
          this.general.getData(this.general.Queries.BDS,'BDS',this.retrieveData,this, null, this.general);}, 
        error => {alert("Invalid Entry, check Console"); console.log(error);this.currentView = 'NewBDS'}, 
        () => this.currentView = 'NewBDS');
    }
      else {
      this.isViewingItem = false;
      this.http.post(this.general.starter + '/api/v2/bds/' + this.NewBDSObject.ID, JSON.stringify(this.NewBDSObject), options)
        .map(res => res.json())
        .subscribe(res => {
          this.general.getData(this.general.Queries.BDSDashboard,'BDSDashboard',this.retrieveData,this, null, this.general);
          this.general.getData(this.general.Queries.BDS,'BDS',this.retrieveData,this, null, this.general);
          this.clearForm();
        }, 
        error => {alert("Invalid Entry, check Console"); console.log(error);this.currentView = 'NewBDS'}, 
        () => this.currentView = 'NewBDS');
    }
  }
  
}
