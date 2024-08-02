import { NgModule } from '@angular/core';
import { VideoPersonalizationComponent } from './video-personalization/video-personalization.component';
import { RouterModule, Routes } from '@angular/router';
import { ShowVideosComponent } from './show-videos/show-videos/show-videos.component';
//import { authGuard } from '../service/guard/auth.guard';
import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
    {
        path:'VideoPersonalization',
        component:VideoPersonalizationComponent,
        data:{
            title:'Video Personalization'
        },
        canActivate:[AuthGuard]
  
      
    },
    {
        path: 'VideoPersonalization/:name',
        component:ShowVideosComponent ,
        data:{
            title:'Video Personalization' 
        },
        
        canActivate:[AuthGuard]
  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VideoPersonalizationRoutingModule {}



