import { Component, OnInit } from '@angular/core';
import { MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { AuthenticationService } from './authentication.service'
import { GeneralService } from '../../general.service'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
declare const $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  currentView:string = 'View';
  textarea:string = '';
  searchText:string = '';
  finalTable:Object;
  showForm:boolean = false;
  newUser:any = {
    formName: '',
    ID: '',
    TITLE: '',
    EMAIL: '',
    USER_TYPE: '',
    REP_ID: '',
  }
  constructor(private http:Http, private general:GeneralService, private auth:AuthenticationService) { }

  ngOnInit() {
    this.finalTable = this.general.Users;
  }

  download() {
      let headers = new Headers({ 'Accept': 'text/csv' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.get(this.general.starter + '/api/v2/users/download', options)
        .subscribe(res => {
          let blob = new Blob([res.text()], {type: 'text/csv'});
          let url = window.URL.createObjectURL(blob);   
          window.open(url);
        }, 
        error => {alert("Invalid Request"); console.log(error);});     
  }

  retrieveData(updateObject, data, router, menuService, general) {
    updateObject.searchText = '';
    updateObject.finalTable = general.Users;
    updateObject.newUser.ID = '';
    updateObject.newUser.TITLE = '';
    updateObject.newUser.EMAIL = '';   
    updateObject.newUser.USER_TYPE = '';   
    updateObject.newUser.REP_ID = '';    
  }
  beginEdit(user) {
    this.newUser.ID = user.ID; 
    this.newUser.TITLE = user.TITLE; 
    this.newUser.EMAIL = user.EMAIL; 
    this.newUser.USER_TYPE = user.USER_TYPE; 
    this.newUser.REP_ID = user.REP_ID; 
    $("#newUserStartLocation").focus();
  }
  bulkUpload() {
    if (this.textarea !== '' && this.textarea !== null) {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});   
      this.http.post(this.general.starter + '/api/v2/users', JSON.stringify({upload:this.textarea}), options)
        .map(res => res.json())
        .subscribe(res => {alert(res.success); this.general.getData(this.general.Queries.Users,'Users',this.retrieveData,this, null, this.general);
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
    if (this.newUser.TITLE !== '' && this.newUser.EMAIL !== '') {
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Content-Type', `application/json`);
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers});       
      this.http.post(this.general.starter + '/api/v2/users', JSON.stringify(this.newUser), options)
        .map(res => res.json())
        .subscribe(res => {alert(res.success); this.general.getData(this.general.Queries.Users,'Users',this.retrieveData,this, null, this.general);
    $("#newUserStartLocation").focus();  
    }, 
        error => {alert(error.error); console.log(error);this.currentView = 'View'}, 
        () => this.currentView = 'View');
    }    
    else {
      alert('User must have a valid Name and Email Address');
      this.currentView = 'View'
    }
  }

  userAction(user, action) {
    this.showForm = false;
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Content-Type', `application/json`);
    headers.append('Authorization', `Bearer ${this.auth.token}`);
    let options = new RequestOptions({headers: headers});       
    this.http.put(this.general.starter + '/api/v2/users', JSON.stringify({ID: user.ID, ACTION: action}), options)
      .map(res => res.json())
      .subscribe(res => {this.general.getData(this.general.Queries.Users,'Users',this.retrieveData,this, null, this.general);alert(res.success)}, 
      error => {alert(error.error); console.log(error)}, 
      () => console.log('complete'));
  }

  searchUsers() {
    if (this.searchText == '') {
      this.finalTable = this.general.Users;
    }
    else {
      this.finalTable = this.general.Users.filter(a => {
        if (a.TITLE.toLowerCase().indexOf(this.searchText.toLowerCase())  > -1 ||
          a.EMAIL.toLowerCase().indexOf(this.searchText.toLowerCase())  > -1) {
          return a;
        }
      })
    }
  }

}