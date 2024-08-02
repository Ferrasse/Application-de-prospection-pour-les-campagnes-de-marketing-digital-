import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full-layout/full-layout.component";
import { CommonLayoutComponent } from "./layouts/common-layout/common-layout.component";

import { FullLayout_ROUTES } from "./shared/routes/full-layout.routes";
import { CommonLayout_ROUTES } from "./shared/routes/common-layout.routes";

import { AutomationComponent } from './automation/automation.component';
// import { authGuard } from './service/guard/auth.guard';

import { HomeComponent } from './security/home/home.component';
import { AdminComponent } from './security/admin/admin/admin.component';
import { AppComponent } from './app.component';
import { ManageStorageComponent } from './admin-dash/manage-storage/manage-storage.component';
import { ManageUsersComponent } from './admin-dash/manage-users/manage-users.component';
import { PricingComponent } from './pages/pricing/pricing.component';
//import { SettingComponent } from './admin-dash/setting/setting.component';
import { SupportClientComponent } from './admin-dash/support-client/support-client.component';
import { SettingComponent } from './pages/setting/setting.component';
import { CreateUsersComponent } from './admin-dash/create-users/create-users.component';
import { UpdateUserComponent } from './admin-dash/update-user/update-user/update-user.component';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';


const appRoutes: Routes = [
 

    { path: 'home', component:HomeComponent },
    { path: 'admin', component:AdminComponent },

    
   
    { path: '',redirectTo: '/authentication/login-1', pathMatch: 'full'},
  
  

    {
        path: '',
        component: CommonLayoutComponent,
        children: CommonLayout_ROUTES,
      //  canActivate: [authGuard]
        
    },
    

  {
      path: '',
      component: FullLayoutComponent,
      children: FullLayout_ROUTES
  },

{
    path: 'Automation',
    component: AutomationComponent,
    data: { title: 'Automation' }
},
{
    path: 'manage-storage',
    component: ManageStorageComponent,
    data: { title: 'Manage Storage' }
}
,
{
    path: 'manage-users',
    component: ManageUsersComponent,
    data: { title: 'Manage Users' }
},
{
    path: 'pricing',
    component: PricingComponent,
    data: { title: 'Pricing' }
},
{
    path: 'setting',
    component: SettingComponent,
    data: { title: 'Setting' }
},
{
    path: 'support-client',
    component: SupportClientComponent,
    data: { title: 'Support Client' }
},
{
    path: 'create-users',
    component: CreateUsersComponent,
    data: { title: 'create Clients' }
},
{
    path: 'update-users',
    component:UpdateUserComponent,
    data: { title: 'update Clients' }
}
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            preloadingStrategy: PreloadAllModules,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [
        RouterModule
    ],
  
})

export class AppRoutingModule {
}


