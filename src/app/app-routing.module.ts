import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './_Components/login/login.component';
import { MenuComponent } from './_Components/menu/menu.component';
import { InvalidRouteComponent } from './_Components/invalid-route/invalid-route.component';
import { DashboardComponent } from './_Components/dashboard/dashboard.component';
import { BDSComponent } from './_Components/bds/bds.component';
import { UploadsComponent } from './_Components/uploads/uploads.component';
import { UsersComponent } from './_Components/users/users.component';
import { FacilitiesComponent } from './_Components/facilities/facilities.component';
import { BillersComponent } from './_Components/billers/billers.component';
import { RepsComponent } from './_Components/reps/reps.component';
import { AppNavigateComponent } from './_Components/app-navigate/app-navigate.component';
import { ReportsComponent } from './_Components/reports/reports.component';


//import { FacilitylegendComponent } from './_Components/facilitylegend/facilitylegend.component';
//import { SuperuserComponent } from './_Components/superuser/superuser.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'app',
    component: AppNavigateComponent,
    children: [
        {
          path: '', redirectTo: 'bds', pathMatch: 'full'
        },
        {
          path: 'login',
          component: LoginComponent
        },    
        {
          path: 'dashboard',
          component: DashboardComponent        
        },      
        {
          path: 'uploads',
          component: UploadsComponent        
        },      
        {
          path: 'bds',
          component: BDSComponent        
        },      
        {
          path: 'users',
          component: UsersComponent        
        },      
        {
          path: 'facilities',
          component: FacilitiesComponent        
        },      
        {
          path: 'billers',
          component: BillersComponent        
        },      
        {
          path: 'reps',
          component: RepsComponent        
        },      
        {
          path: 'reports',
          component: ReportsComponent        
        }
    ]
  },
  {
    path: '**',
    component: InvalidRouteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
