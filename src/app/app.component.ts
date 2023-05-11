import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService, MenuItem } from './_Components/menu/menu.service';
import { AuthenticationService } from './_Components/users/authentication.service';
import { GeneralService } from './general.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';

declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  token: string;

  constructor(private general:GeneralService, private auth:AuthenticationService, private router:Router, private menuService:MenuService) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        let route = val.urlAfterRedirects;
        this.menuService.selectItem(route);
      }
    })    
   }

   handleCredentialResponse(response: CredentialResponse) {
    // Decoding  JWT token...
      let decodedToken: any | null = null;
      try {
        decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
        localStorage.removeItem('ng2-ui-auth_token');
        this.auth.token = response.credential;
        this.auth.AuthHeaders.headers.Authorization += this.auth.token;
        localStorage.setItem('ng2-ui-auth_token', response.credential);
        this.router.navigate([this.menuService.initialScreen]); 
        location.reload();



      } catch (e) {
        console.error('Error while trying to decode token', e);
      }
      console.log('decodedToken', decodedToken);
    }

  ngOnInit() {

    (window as any).onGoogleLibraryLoad = () => {
      console.log('Google\'s One-tap sign in script loaded!');
    
      // @ts-ignore
      google.accounts.id.initialize({
        // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
        client_id: '114225384341-vp8o4shsf33nc1g0kmt67j3erf5q3ui5.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this), // Whatever function you want to trigger...
        auto_select: true,
        cancel_on_tap_outside: false,
        context: 'signin'
      });
    
      // OPTIONAL: In my case I want to redirect the user to an specific path.
      // @ts-ignore
      //google.accounts.id.prompt((notification: PromptMomentNotification) => {
      //  console.log('Google prompt event triggered...');
    
      //  if (notification.getDismissedReason() === 'credential_returned') {
      //      console.log('Welcome back!');

      //  } else if (notification.getNotDisplayedReason() === 'suppressed_by_user') {
          // one tap was dismissed, so show sign-in button instead.
    //      google.accounts.id.renderButton(document.getElementById("signinDiv"), {
    //        theme: 'filled_blue',
    //        size: 'large',
    //        logo_alignment: 'center'
    //      });
      
    //    }
    //  });

      google.accounts.id.renderButton(document.getElementById("signinDiv"), {
        theme: 'filled_blue',
        size: 'large',
        logo_alignment: 'center'
      });
    };

  }
}
