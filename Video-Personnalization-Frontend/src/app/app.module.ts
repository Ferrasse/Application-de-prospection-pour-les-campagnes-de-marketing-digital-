// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
// import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
// import { NzSpinModule } from 'ng-zorro-antd/spin';

// import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common';
// import en from '@angular/common/locales/en';

// import { AppRoutingModule } from './app-routing.module';
// import { TemplateModule } from './shared/template/template.module';
// import { SharedModule } from './shared/shared.module';

// import { NgChartsModule  } from 'ng2-charts';
// import { NgApexchartsModule } from "ng-apexcharts";
// import { AngularSvgIconModule } from 'angular-svg-icon';
// import { FullCalendarModule } from '@fullcalendar/angular';

// import { AppComponent } from './app.component';
// import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
// import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
// import { ThemeConstantService } from './shared/services/theme-constant.service';
// import { AutomationComponent } from './automation/automation.component';
// import { NzModalModule } from 'ng-zorro-antd/modal';

// import { HttpClientModule } from '@angular/common/http';


// registerLocaleData(en);

// @NgModule({
//     declarations: [
//         AppComponent,
//         CommonLayoutComponent,
//         FullLayoutComponent,
//         AutomationComponent,
//     ],
//     imports: [
//         NzModalModule,
//         BrowserModule,
//         BrowserAnimationsModule,
//         AppRoutingModule,
//         TemplateModule,
//         SharedModule,
//         NzBreadCrumbModule,
//         NzSpinModule,
//         NgChartsModule,
//         NgApexchartsModule,
//         FullCalendarModule,
//         AngularSvgIconModule.forRoot(),
//         HttpClientModule
       
//     ],
//     providers: [
//         {
//             provide: NZ_I18N,
//             useValue: en_US,
//         },
//         {
//             provide: LocationStrategy,
//             useClass: PathLocationStrategy
//         },
//         ThemeConstantService,
        
//     ],
//     bootstrap: [AppComponent]
// })
// export class AppModule { }
import {APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './shared/template/template.module';
import { SharedModule } from './shared/shared.module';

import { NgChartsModule  } from 'ng2-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import { AutomationComponent } from './automation/automation.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

// import { KeycloakService } from './service/keycloak/keycloak.service';
// import { KeycloakAngularModule } from 'keycloak-angular';
// import { HttpTokenInterceptor } from './service/interceptor/http-token.interceptor';
import {FormsModule} from '@angular/forms';


import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './security/admin/admin/admin.component';
import { HomeComponent } from './security/home/home.component';

// export function initializeKeycloak(keycloakService: KeycloakService) {
//     return () => keycloakService.init();
//   }
// export function kcFactory(kcService: KeycloakService) {
//     return () => kcService.init();
//   }
import { ReactiveFormsModule } from '@angular/forms';
import { ManageUsersComponent } from './admin-dash/manage-users/manage-users.component';
import { ManageStorageComponent } from './admin-dash/manage-storage/manage-storage.component';
import { PricingComponent } from './admin-dash/pricing/pricing.component';
import { SupportClientComponent } from './admin-dash/support-client/support-client.component';
import { SettingComponent } from './admin-dash/setting/setting.component';
import { CommonlayoutadminComponent } from './security/admin/commonlayoutadmin/commonlayoutadmin/commonlayoutadmin.component';
import { CreateUsersComponent } from './admin-dash/create-users/create-users.component';
import { UpdateUserComponent } from './admin-dash/update-user/update-user/update-user.component';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        FullLayoutComponent,
        AutomationComponent,
        AdminComponent,
        HomeComponent,
        ManageUsersComponent,
        ManageStorageComponent,
        PricingComponent,
        SupportClientComponent,
        SettingComponent,
        CommonlayoutadminComponent,
        CreateUsersComponent,
        UpdateUserComponent
    ],
    imports: [
        NzModalModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        TemplateModule,
        SharedModule,
        NzBreadCrumbModule,
        NzSpinModule,
        NgChartsModule,
        NgApexchartsModule,
        FullCalendarModule,
        AngularSvgIconModule.forRoot(),
        HttpClientModule,
       // KeycloakAngularModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: en_US,
        },
        HttpClient,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpTokenInterceptor,
    //   multi: true
    // },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        // {
        //     provide: APP_INITIALIZER,
        //     deps: [KeycloakService],
        //     useFactory: kcFactory,
        //     multi: true
        //   },
        ThemeConstantService,
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
