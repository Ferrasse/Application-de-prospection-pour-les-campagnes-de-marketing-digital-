import { NgModule } from '@angular/core';
import { AdminComponent } from '../security/admin/admin/admin.component';
import { RouterModule, Routes } from '@angular/router';

//import { authGuard } from '../service/guard/auth.guard';
import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
    {
        path:'managestorage',
        component:AdminComponent,
        data:{
            title:'manage storage'
        },
        canActivate:[AuthGuard]
  
      
    },
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}



