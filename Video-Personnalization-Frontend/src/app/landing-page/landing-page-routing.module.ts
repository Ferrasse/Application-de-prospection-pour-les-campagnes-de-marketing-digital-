import { NgModule } from '@angular/core';
import { LandingPageModule } from './landing-page.module';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';



const routes: Routes = [
    {
        path:'landing-page/:name',
        component:LandingPageComponent,
        data:{
            title:'Landing Page'
        }
    },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LandingPageRoutingModule {}



