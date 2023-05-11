import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../users/authentication.service'
import { GeneralService } from '../../general.service'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
declare const $: any;
@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {

  currentView:string = 'View';
  textarea:string = '';
  searchText:string = '';
  finalTable:Object;
  showForm:boolean = false;
  newUser:any = {
    formName: '',
    ID: '',
    TITLE: '',
    ACRONYMN: ''
  }
  constructor(private http:Http, private general:GeneralService, private auth:AuthenticationService) { }

  ngOnInit() {
    this.finalTable = this.general.Facilities;
  }
  changeView(view:string) {
    this.currentView = view;
  }
  retrieveData(updateObject, data, router, menuService, general) {
    updateObject.searchText = '';
    updateObject.finalTable = general.Facilities;
    updateObject.newUser.ID = '';
    updateObject.newUser.TITLE = '';
    updateObject.newUser.ACRONYM = '';
  }
  beginEdit(user) {
    this.newUser.ID = user.ID; 
    this.newUser.TITLE = user.TITLE; 
    this.newUser.ACRONYM = user.ACRONYM; 
    $("#newUserStartLocation").focus();
  }  

  download() {
      let headers = new Headers({ 'Accept': 'text/csv' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.get(this.general.starter + '/api/v2/facilities/download', options)
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
      this.http.post(this.general.starter + '/api/v2/facilities', JSON.stringify({upload:this.textarea}), options)
        .map(res => res.json())
        .subscribe(res => {alert(res.success); this.general.getData(this.general.Queries.Facilities,'Facilities',this.retrieveData,this, null, this.general);
        this.currentView = 'View';
        $("#newUserStartLocation").focus();      
    }, 
        error => {alert(error.error); console.log(error);this.currentView = 'View'}, 
        () => this.currentView = 'View');  
      this.textarea = '';        
    }
    else {
      alert('Upload Must Have Data');
    }
  }
  saveForm() {
    this.showForm = false;
    if (this.newUser.TITLE !== '') {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      this.http.post(this.general.starter + '/api/v2/facilities', JSON.stringify(this.newUser), options)
        .map(res => res.json())
        .subscribe(res => {alert(res.success); this.general.getData(this.general.Queries.Facilities,'Facilities',this.retrieveData,this, null, this.general);
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
      this.finalTable = this.general.Facilities;
    }
    else {
      this.finalTable = this.general.Facilities.filter(a => {
        if (a.TITLE.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1 || a.ACRONYM.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) {
          return a;
        }
      })
    }
  }

}
