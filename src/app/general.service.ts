import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './_Components/users/authentication.service';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class GeneralService {
  mode:string = 'PRODUCTION';
  Reps:any;
  Facilities:any;
  Users:any;
  Billers:any;
  ActiveReports:any;
  BDS:any;
  BDSDashboard:any;
  CustomObject:any;
  Reports:any;
  ErrorObject:any;
  isComplete:boolean;
  bdsOffset:number = 0;
  bdsFilterColumn:string = '';
  bdsFilterString:string = '';
  starter:string = (this.mode == 'PRODUCTION') ? '' : 'http://localhost:3000';
  showLogin: boolean = true;
  Queries:any = {
    Reps: '/api/v2/reps',
    Facilities: '/api/v2/facilities',
    Users: '/api/v2/users',
    Billers: '/api/v2/billers',
    ActiveReports: '/api/v2/activereports',
    BDS: `/api/v2/bds?offset=${this.bdsOffset}&limit=500&filterColumn=${this.bdsFilterColumn}&filterString=${this.bdsFilterString}`,
    BDSDashboard: `/api/v2/bdsdashboard`,
    Reports: '/api/v2/reports'
  }
  constructor(private http:Http, private auth:AuthenticationService, private router:Router) { }
  kill() {
    this.Reps = null;
    this.Facilities = null;
    this.Users = null;
    this.Billers = null;
    this.ActiveReports = null;
    this.BDS = null;
    this.Reports = null;
    this.BDSDashboard = null;
    this.CustomObject = null;
    this.ErrorObject = null;
    this.isComplete = false;
    this.bdsOffset = 0;
    this.bdsFilterColumn = '';
    this.bdsFilterString = '';
  }
  initialize() {
    for (let prop in this.Queries) {
      this.getData(this.Queries[prop], prop);
    }
  }
  getData(query:string, object?:string, callback?:Function, updateObject?:any, menuService?:any, general?:any, errorCallback?:Function) {
      this.isComplete = false;
      let headers = new Headers({ 'Accept': 'application/json' });
      headers.append('Authorization', `Bearer ${this.auth.token}`);
      let options = new RequestOptions({headers: headers}); 
      options.withCredentials = false;  
      if (object) {
      this.http.get(this.starter + query, options)
          .map(response => response.json())
          .subscribe(response => {
              this[object] = response.successObject;
              if (callback) {
                callback(updateObject, response.successObject, this.router, menuService, general);
              }
          }, error => {
              this.ErrorObject = error;
              console.log(error);
              if (errorCallback) {
                errorCallback(updateObject, error, this.router, menuService, general);
              }
          }, () => {
              this.isComplete = true;
          });     
      }
      else {
        this.http.get(this.starter + query, options)
          .map(response => response.json())
          .subscribe(response => {
            callback(updateObject, response[0], this.router, menuService, general);
          }, error => {
            console.log(error);
            if (errorCallback) {
              errorCallback(updateObject, error, this.router, menuService, general);
            }            
          })
      }
  }

}
