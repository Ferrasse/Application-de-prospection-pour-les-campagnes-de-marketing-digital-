import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeLogComponent } from './changelog/changelog.component';
import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
    {
        path: 'changelog',
        component: ChangeLogComponent,
        data: {
            title: 'Change Log'
        },
        canActivate:[AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChangelogRoutingModule { }
