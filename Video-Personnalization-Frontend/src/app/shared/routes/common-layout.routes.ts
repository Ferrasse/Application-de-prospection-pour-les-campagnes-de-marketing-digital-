import { Routes } from '@angular/router';
import { ComponentsComponent } from '../../components/components.component'
import { AuthGuard } from 'src/app/security/auth.guard';


export const CommonLayout_ROUTES: Routes = [

    //Dashboard
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
        
    },
  
    // Charts
    {
      path: 'changelog',
      children: [
          {
              path: '',
              redirectTo: '/changelog/changelog',
              pathMatch: 'full'
          },
          {
              path: '',
              loadChildren: () => import('../../changelog/changelog.module').then(m => m.ChangelogModule)
            },
        ],
        canActivate:[AuthGuard]
    },
  {
path:'VideoPersonalization',
children:[
{
    path:'',
    redirectTo:'/VideoPersonalization/VideoPersonalization',
    pathMatch:'full',
    
},

{
    path:'',
    loadChildren:() => import('../../video-personalization/video-personalization.module').then(m => m.VideoPersonalizationModule)
},

]

  },


  {
    path:'landing-page',
    children:[
    {
        path:'',
        redirectTo:'/landing-page/landing-page',
        pathMatch:'full'
    },
    
    {
        path:'',
        loadChildren:() => import('../../landing-page/landing-page.module').then(m => m.LandingPageModule)
    },
    
    ],
   
    
      },
    
    //Apps
    {
        path: 'apps',
        data: {
            title: 'Apps'
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../apps/apps.module').then(m => m.AppsModule)
            },
            
        ],
        
        
    },

    //Component
    {
        path: 'demo',
        component: ComponentsComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule)
            }
        ],
        data: {
            title: 'Components '
        }
        
    },

    // Charts
    {
      path: 'features',
      data: {
          title: 'features'
      },
      children: [
          {
              path: '',
              redirectTo: '/dashboard',
              pathMatch: 'full'
          },
          {
              path: '',
              loadChildren: () => import('../../features/features.module').then(m => m.FeaturesModule)
            },
        ]
    },

    //Pages
    {
        path: 'pages',
        data: {
            title: 'Pages '
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../pages/pages.module').then(m => m.PagesModule)
            },
        ]
    }
];