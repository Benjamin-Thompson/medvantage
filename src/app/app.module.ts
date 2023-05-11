import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { ModalModule } from 'ngx-bootstrap';

import { MenuService } from './_Components/menu/menu.service';
import { AuthenticationService } from './_Components/users/authentication.service';
import { DatePickerService } from './_Components/date-picker/date-picker.service';
import { GeneralService } from './general.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_Components/login/login.component';
import { MenuComponent } from './_Components/menu/menu.component';
import { InvalidRouteComponent } from './_Components/invalid-route/invalid-route.component';
import { DashboardComponent } from './_Components/dashboard/dashboard.component';
import { BDSComponent } from './_Components/bds/bds.component';
import { UploadsComponent } from './_Components/uploads/uploads.component';
import { UsersComponent } from './_Components/users/users.component';
import { FacilitiesComponent } from './_Components/facilities/facilities.component';
import { RepsComponent } from './_Components/reps/reps.component';
import { DatePickerComponent } from './_Components/date-picker/date-picker.component';
import { ManualEntryComponent } from './_Components/manual-entry/manual-entry.component';
import { TableViewerComponent } from './_Components/table-viewer/table-viewer.component';
import {Ng2UiAuthModule, CustomConfig, AuthService} from 'ng2-ui-auth';
import { BillersComponent } from './_Components/billers/billers.component';
import { AppNavigateComponent } from './_Components/app-navigate/app-navigate.component';
import { ReportsComponent } from './_Components/reports/reports.component';
//import { FacilitylegendComponent } from './_Components/facilitylegend/facilitylegend.component';
//import { SuperuserComponent } from './_Components/superuser/superuser.component';


export const GOOGLE_CLIENT_ID = '114225384341-vp8o4shsf33nc1g0kmt67j3erf5q3ui5.apps.googleusercontent.com';
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {google: {clientId: GOOGLE_CLIENT_ID}};
    baseUrl = 'https://reports.medvantageco.com/api/v2';
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    InvalidRouteComponent,
    DashboardComponent,
    BDSComponent,
    UploadsComponent,
    UsersComponent,
    FacilitiesComponent,
    RepsComponent,
    DatePickerComponent,
    ManualEntryComponent,
    TableViewerComponent,
    BillersComponent,
    AppNavigateComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ModalModule.forRoot(),
    Ng2UiAuthModule.forRoot(MyAuthConfig)
  ],
  providers: [
    GeneralService,
    MenuService,
    AuthenticationService,
    DatePickerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
