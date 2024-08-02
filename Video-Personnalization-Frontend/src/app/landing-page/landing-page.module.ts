import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { DemoComponentsShareModule } from '../components/demo-components-share/demo-components-share.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ProcessingService } from '../service_videos_processing/processing-service.service';
import { AppComponent } from '../app.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterModule } from '@angular/router';
import { LandingPageRoutingModule } from './landing-page-routing.module';



@NgModule({
    declarations: [
     LandingPageComponent
    
      
    ],
    imports: [
      CommonModule,
      SharedModule,
      LandingPageRoutingModule,
      NzCardModule,
      DemoComponentsShareModule,
      NzCollapseModule,
      NzSkeletonModule,
      NzUploadModule,
      NzSpinModule,
      NzTableModule
    ],
    exports: [
      LandingPageComponent
    ],
    providers: [
      ThemeConstantService,
      ProcessingService,

  ],
  bootstrap: [AppComponent]
  })
  export class LandingPageModule { }







