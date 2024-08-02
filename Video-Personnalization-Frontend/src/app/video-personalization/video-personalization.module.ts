import { APP_INITIALIZER , NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPersonalizationComponent } from './video-personalization/video-personalization.component';
import { SharedModule } from '../shared/shared.module';
import { VideoPersonalizationRoutingModule } from './video-personalization-routing.module';
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
import { ShowVideosComponent } from './show-videos/show-videos/show-videos.component';
import { TooltipDirectiveComponent } from './tooltip-directive/tooltip-directive.component';
//import { KeycloakService } from '../service/keycloak/keycloak.service';

// export function kcFactory(kcService: KeycloakService) {
//   return () => kcService.init();
// }




@NgModule({
    declarations: [
      VideoPersonalizationComponent,
      ShowVideosComponent,
      TooltipDirectiveComponent,
    
      
    ],
    imports: [
      CommonModule,
      SharedModule,
      VideoPersonalizationRoutingModule,
      NzCardModule,
      DemoComponentsShareModule,
      NzCollapseModule,
      NzSkeletonModule,
      NzUploadModule,
      NzSpinModule,
      NzTableModule
    ],
    exports: [
      VideoPersonalizationComponent
    ],
    providers: [
      ThemeConstantService,
      ProcessingService,
      // {
      //   provide: APP_INITIALIZER,
      //   deps: [KeycloakService],
      //   useFactory: kcFactory,
      //   multi: true
      // },

  ],
  bootstrap: [AppComponent]
  })
  export class VideoPersonalizationModule { }







