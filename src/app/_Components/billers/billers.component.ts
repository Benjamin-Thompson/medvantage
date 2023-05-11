import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../users/authentication.service'
import { GeneralService } from '../../general.service'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
declare const $: any;
@Component({
  selector: 'app-billers',
  templateUrl: './billers.component.html',
  styleUrls: ['./billers.component.css']
})
export class BillersComponent implements OnInit {

  currentView:string = 'View';
  textarea:string = '';
  searchText:string = '';
  finalTable:Object;
  showForm:boolean = false;
  newUser:any = {
    formName: '',
    ID: '',
    TITLE: '',
    ABBREVIATION: ''
  }
  constructor(private http:Http, private general:GeneralService, private auth:AuthenticationService) { }

  ngOnInit() {
    this.finalTable = this.general.Billers;
  }
  retrieveData(updateObject, data, router, menuService, general) {
    updateObject.searchText = '';
    updateObject.finalTable = general.Billers;
    updateObject.newUser.ID = '';
    updateObject.newUser.TITLE = '';
    updateObject.newUser.ABBREVIATION = '';    
  }
  download() {
      let headers = new Headers({ 'Accept': 'text/csv' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.get(this.general.starter + '/api/v2/billers/download', options)
        .subscribe(res => {
          let blob = new Blob([res.text()], {type: 'text/csv'});
          let url = window.URL.createObjectURL(blob);   
          window.open(url);
        }, 
        error => {alert("Invalid Request"); console.log(error);});     
  }
  
  bulkUpload() {
    if (this.textarea !== '' && this.textarea !== null) {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.post(this.general.starter + '/api/v2/billers', JSON.stringify({upload:this.textarea.split("\n")}), options)
        .map(res => res.json())
        .subscribe(res => {alert(res.success); this.general.getData(this.general.Queries.Billers,'Billers',this.retrieveData,this, null, this.general);
        this.general.getData(this.general.Queries.Reports,'Reports',this.retrieveData,this, null, this.general);
        this.currentView = 'View';
        $("#newUserStartLocation").focus();      
    }, 
        error => {alert("Invalid Request"); console.log(error);this.currentView = 'View'}, 
        () => this.currentView = 'View');  
      this.textarea = '';        
    }
    else {
      alert('Upload Must Have Data');
    }
  }
  beginEdit(user) {
    this.newUser.ID = user.ID; 
    this.newUser.TITLE = user.TITLE; 
    this.newUser.ABBREVIATION = user.ABBREVIATION; 
    $("#newUserStartLocation").focus();
  }  
  saveForm() {
    this.showForm = false;
    if (this.newUser.TITLE !== '') {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      this.http.post(this.general.starter + '/api/v2/billers', JSON.stringify(this.newUser), options)
        .map(res => res.json())
        .subscribe(res => {alert(res.success); this.general.getData(this.general.Queries.Billers,'Billers',this.retrieveData,this, null, this.general);
        this.general.getData(this.general.Queries.Reports,'Reports',this.retrieveData,this, null, this.general);
        $("#newUserStartLocation").focus();
      }, 
        error => {alert("Invalid Request"); console.log(error);this.currentView = 'View'}, 
        () => this.currentView = 'View');
    }    
    else {
      alert('Billers must have a valid Name');
      this.currentView = 'View'
    }
  }

  searchUsers() {
    if (this.searchText == '') {
      this.finalTable = this.general.Billers;
    }
    else {
      this.finalTable = this.general.Billers.filter(a => {
        if (a.TITLE.toLowerCase().indexOf(this.searchText.toLowerCase())  > -1 || a.ABBREVIATION.toLowerCase().indexOf(this.searchText.toLowerCase())  > -1) {
          return a;
        }
      })
    }
  }

}
