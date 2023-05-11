import { Injectable } from '@angular/core';
import { AuthenticationService } from '../users/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { GeneralService } from '../../general.service';
declare const $: any;
export class MenuItem {
  title:string;
  usertype:string;
  isSelected:boolean;
  navigation:string;
  color:string;
  router:Router
  constructor(menuRouter:Router, menuTitle:string, menuUserType?:string, menuNavigation?:string) {
    this.router = menuRouter;
    this.title = menuTitle;
    this.usertype = menuUserType;
    this.navigation = menuNavigation;
    this.isSelected = false;
    this.color = 'gray';
  }
  goToRoute() {
    this.router.navigate([this.navigation]);
  }
}

@Injectable()
export class MenuService {
  showMenu:boolean = false;
  hideMenu:boolean = false;
  version:number = 3;
  menuItems:Array<MenuItem> = new Array<MenuItem>();
  footerMenuItems:Array<MenuItem> = new Array<MenuItem>();
  selectItems:Array<MenuItem>;
  hasInitialized:boolean = false;
  initialScreen:string = '';

  constructor(public auth:AuthenticationService, public router:Router, private general:GeneralService) { 
    function updateAuth(updateObject:AuthenticationService, data, router, menuService:MenuService, general:GeneralService) {
      if (data) {
        updateObject.picture = data.PICTURE;
        updateObject.username = data.DISPLAY_NAME;
        updateObject.usertype = data.USER_TYPE;
        updateObject.repid = data.REP_ID;
        updateObject.token = localStorage.getItem('ng2-ui-auth_token');
        updateObject.AuthHeaders.headers.Authorization += updateObject.token;
        updateObject.isAuthenticated = true;
        general.showLogin = false;
        general.initialize();       
        menuService.initialize();  
        menuService.showMenu = true;
        router.navigate([menuService.initialScreen]);      
      }
    }
    if (localStorage.getItem('ng2-ui-auth_token')) {
      if (this.hasInitialized == false) {
        this.hasInitialized = true;
        
        this.auth.token = localStorage.getItem('ng2-ui-auth_token');
        this.general.getData('/api/v2/me', null, updateAuth, this.auth, this, this.general);
      }
    }    
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        let route = val.urlAfterRedirects;
        this.selectItem(route);
      }
    });
  }
  kill() {
    this.showMenu = false;
    this.menuItems = new Array<MenuItem>();
    this.footerMenuItems = new Array<MenuItem>();
    this.selectItems = new Array<MenuItem>();
    this.hasInitialized = false;    
  }

  changeMenu() {
    this.showMenu = !this.showMenu;
  }
  initialize() {
    const dashboard = new MenuItem(this.router, 'Dashboard', this.auth.usertype, '/app/dashboard');
    const uploads = new MenuItem(this.router, 'Uploads', this.auth.usertype, '/app/uploads');
    const bds = new MenuItem(this.router, 'BDS', this.auth.usertype, '/app/bds');
    const users = new MenuItem(this.router, 'Users', this.auth.usertype, '/app/users');
    const facilities = new MenuItem(this.router, 'Facilities', this.auth.usertype, '/app/facilities');
    const reps = new MenuItem(this.router, 'Reps', this.auth.usertype, '/app/reps');
    const reports = new MenuItem(this.router, 'Reports', this.auth.usertype, '/app/reports');
    const billers = new MenuItem(this.router, 'Billers', this.auth.usertype, '/app/billers');
    const logs = new MenuItem(this.router, 'Logs', this.auth.usertype, '/app/logs');
    const bdserrors = new MenuItem(this.router, 'Facility Errors', this.auth.usertype, '/app/facilityreporting');

    
    if (this.auth.usertype == 'ADMIN') {
        this.selectItems = [
              dashboard,
              uploads,
              bds,
              facilities,
              users,
              reps,
              billers
              //logs
        ];
        this.initialScreen = '/app/dashboard';
    }
    else if (this.auth.usertype == 'EDITOR') {
        this.selectItems = [
              bds
        ];
        this.initialScreen = '/app/bds';
    }
    else {
        this.selectItems = [
              dashboard
        ];
        this.initialScreen = '/app/dashboard';
    }
    this.menuItems = [];
    for (let item of this.selectItems) {
      this.menuItems.push(item);
    }   


  }
  
  selectItem(item:string) {
    this.showMenu = true;
    
    for (let i of this.menuItems) {
      i.isSelected = false;
      i.color = 'gray';
      if (i.navigation == `/app/${item}` || i.navigation == `${item}`) {
        i.isSelected = true;
        i.color = '#90EE90';
      }
    }   
  }

  logout() {
      this.auth.token = null;
      this.auth.AuthHeaders.headers.Authorization += null;
      localStorage.removeItem('ng2-ui-auth_token');
      this.general.kill();
      this.kill();
      this.router.navigate(['/']);
      this.general.showLogin = true;
      alert("You are logged out");  
      window.location.href = (this.general.starter == '') ? 'http://reports.medvantageco.com': 'http://localhost:4200';     
  }
}
