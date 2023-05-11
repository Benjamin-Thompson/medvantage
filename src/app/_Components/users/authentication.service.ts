import { Injectable } from '@angular/core';
import { AuthService } from 'ng2-ui-auth';

@Injectable()
export class AuthenticationService {
  username:string = '';
  usertype:string = '';
  picture:string = '';
  repid:number = 0;
  isAuthenticated:boolean = false;
  token:string;
  router:Object;
  AuthHeaders = {
      withCredentials: true,
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer '}
  }  
  constructor(public auth:AuthService) { }

}
