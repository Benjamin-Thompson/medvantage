import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService, MenuItem } from '../menu/menu.service';
import { AuthenticationService } from '../users/authentication.service';
import { GeneralService } from '../../general.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  constructor(private general:GeneralService, private auth:AuthenticationService, private router:Router, private menuService:MenuService) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        let route = val.urlAfterRedirects;
        this.menuService.selectItem(route);
      }
    })    
   }

 

  ngOnInit() {

    function errorAuth(updateObject:AuthenticationService, error, router, menuService:MenuService, general:GeneralService) {
      console.log(error);
      general.kill();
      menuService.kill();
      general.showLogin = true;
      router.navigate(['']); 
    }    
    function updateAuth(updateObject:AuthenticationService, data, router, menuService:MenuService, general:GeneralService) {
      if (data) {
        updateObject.picture = data.PICTURE;
        updateObject.username = data.DISPLAY_NAME;
        updateObject.usertype = data.USER_TYPE;
        updateObject.repid = data.REP_ID;
        updateObject.token = localStorage.getItem('ng2-ui-auth_token');
        updateObject.AuthHeaders.headers.Authorization += updateObject.token;
        general.initialize();
        menuService.initialize();
        menuService.showMenu = true; 
        console.log(menuService.initialScreen);
        router.navigate([menuService.initialScreen]);     
      }              
    }
    if (localStorage.getItem('ng2-ui-auth_token')) {
      this.menuService.hasInitialized = true;
      this.auth.token = localStorage.getItem('ng2-ui-auth_token');
      this.general.getData('/api/v2/me', null, updateAuth, this.auth, this.menuService, this.general, errorAuth);
    }
  }


  login():void {
    localStorage.removeItem('ng2-ui-auth_token');
    this.auth.AuthHeaders.headers.Authorization = 'Bearer ';
    this.auth.auth.authenticate('google')
      .map(a => a.json())
      .subscribe((response) => {
        this.auth.token = response.token;
        this.auth.AuthHeaders.headers.Authorization += this.auth.token;
        function errorAuth(updateObject:AuthenticationService, error, router, menuService:MenuService, general:GeneralService) {
          console.log(error);
          general.kill();
          menuService.kill();
          general.showLogin = true;
          router.navigate(['']); 
        }
        function updateAuth(updateObject:AuthenticationService, data, router, menuService:MenuService, general:GeneralService) {
          if (data) {
            general.showLogin = false;
            updateObject.isAuthenticated = true;            
            updateObject.picture = data.PICTURE;
            updateObject.username = data.DISPLAY_NAME;
            updateObject.usertype = data.USER_TYPE;
            updateObject.repid = data.REP_ID;
            updateObject.token = localStorage.getItem('ng2-ui-auth_token');
            updateObject.AuthHeaders.headers.Authorization += updateObject.token;
            general.initialize();
            menuService.initialize();
            menuService.showMenu = true;
            console.log(menuService.initialScreen);
            router.navigate([menuService.initialScreen]);    
          }
          else {
            alert("Unable to Log you in. Your credentials are invalid");
            general.kill();
            menuService.kill();
            general.showLogin = true;
            router.navigate(['']);             
          }              
        }
        if (localStorage.getItem('ng2-ui-auth_token')) {
          this.menuService.hasInitialized = true;
          this.general.getData('/api/v2/me', null, updateAuth, this.auth, this.menuService, this.general, errorAuth);  
        }
      }, (error) => {
        console.log(error);
        localStorage.removeItem('ng2-ui-auth_token');
        this.general.kill();
        this.menuService.kill();
        this.general.showLogin = true;
        this.router.navigate(['']);
        alert("Unable to Log you in. Google was unable to authenticate you");
      }, () => {

      });
  }

}
