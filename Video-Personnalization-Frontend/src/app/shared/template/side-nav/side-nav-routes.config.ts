import {
  SideNavInterface
} from '../../interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [{
    path: '',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'appstore-add',
    submenu: [{
        path: '/dashboard/demo-one',
        title: 'User Dashboard ',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: [],
      },
      // {
      //   path: '/dashboard/demo-two',
      //   title: 'Demo Two',
      //   iconType: '',
      //   icon: '',
      //   iconTheme: '',
      //   submenu: []
      // },
      // {
      //   path: '/dashboard/demo-three',
      //   title: 'Demo Three',
      //   iconType: '',
      //   icon: '',
      //   iconTheme: '',
      //   submenu: []
      // },
      // {
      //   path: '/dashboard/demo-four',
      //   title: 'Demo Four',
      //   iconType: '',
      //   icon: '',
      //   iconTheme: '',
      //   submenu: []
      // },
      // {
      //   path: '/dashboard/demo-five',
      //   title: 'Demo Five',
      //   iconType: '',
      //   icon: '',
      //   iconTheme: '',
      //   submenu: []
      // },
      // {
      //   path: '/dashboard/demo-six',
      //   title: 'Demo Six',
      //   iconType: '',
      //   icon: '',
      //   iconTheme: '',
      //   submenu: []
      // },
      // {
      //   path: '/dashboard/demo-seven',
      //   title: 'Demo Seven',
      //   iconType: '',
      //   icon: '',
      //   iconTheme: '',
      //   submenu: []
      // },
      // {
      //   path: '/dashboard/demo-eight',
      //   title: 'Demo Eight',
      //   iconType: '',
      //   icon: '',
      //   iconTheme: '',
      //   submenu: []
      // },
      // {
      //   path: '/dashboard/demo-nine',
      //   title: 'Demo Nine',
      //   iconType: '',
      //   icon: '',
      //   iconTheme: '',
      //   submenu: []
      // },
      // {
      //   path: '/dashboard/demo-ten',
      //   title: 'Demo Ten',
      //   iconType: '',
      //   icon: '',
      //   iconTheme: '',
      //   submenu: []
      // },
    ]
  },
  {
    path: 'VideoPersonalization',
    title: 'Video Personalization',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'play-square',
    submenu: []
  },
 
  {
    path: '/List/List',
    title: 'Client List',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'ordered-list',
    submenu: []
  },
  {
    path: '/campaigns/campaigns',
    title: 'campaigns',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'mail',
    submenu: [{
      
      title: 'Email',
      path: '/apps/email/inbox',
      iconType: '',
      icon: '',
      iconTheme: '',
      submenu: []
          
        },
        {
          path: '/apps/chat',
          title: 'SMS',
          iconType: '',
          icon: '',
          iconTheme: '',
          submenu: []
        },
    
      ]

    },
 


    
  



  // {
  //   path: '/Automation',
  //   title: 'Tags',
  //   iconType: 'nzIcon',
  //   iconTheme: 'outline',
  //   icon: 'tags',
  //   submenu: []
  // },
  {
    path: 'landing-page/landing-page/Racha.mp4',
    title: 'Landing page',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'rocket',
    submenu: []
  },

  {
    path: '/changelog/changelog',
    title: 'changelog',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'rise',
    submenu: []
  },
  // {
  //   path: '',
  //   title: 'Apps',
  //   iconType: 'nzIcon',
  //   iconTheme: 'outline',
  //   icon: 'appstore',
  //   submenu: [{
  //       path: '',
  //       title: 'Email',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: [{
  //           path: '/apps/email/inbox',
  //           title: 'Inbox',
  //           iconType: '',
  //           icon: '',
  //           iconTheme: '',
  //           submenu: []
  //         },
  //         {
  //           path: '/apps/email/read-email',
  //           title: 'Read Email',
  //           iconType: '',
  //           icon: '',
  //           iconTheme: '',
  //           submenu: []
  //         },
  //       ]
  //     },
  //     {
  //       path: '/apps/chat',
  //       title: 'Chat',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/apps/projects',
  //       title: 'Project',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: [{
  //           path: '/apps/projects/project-list',
  //           title: 'Projects',
  //           iconType: '',
  //           icon: '',
  //           iconTheme: '',
  //           submenu: []
  //         },
  //         {
  //           path: '/apps/projects/project-details',
  //           title: 'Project Details',
  //           iconType: '',
  //           icon: '',
  //           iconTheme: '',
  //           submenu: []
  //         }
  //       ]
  //     },
  //     {
  //       path: '/apps/contacts',
  //       title: 'Contacts',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: [{
  //           path: '/apps/contacts/contacts-grid',
  //           title: 'Contacts Grid',
  //           iconType: '',
  //           icon: '',
  //           iconTheme: '',
  //           submenu: []
  //         },
  //         {
  //           path: '/apps/contacts/contacts-list',
  //           title: 'Contact List',
  //           iconType: '',
  //           icon: '',
  //           iconTheme: '',
  //           submenu: []
  //         }
  //       ]
  //     },
  //     {
  //       path: '/apps/todo',
  //       title: 'Todo',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/apps/calendar',
  //       title: 'Calendar',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/apps/import-export',
  //       title: 'Import & Export',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: [{
  //           path: '/apps/import-export/import',
  //           title: 'Import',
  //           iconType: '',
  //           icon: '',
  //           iconTheme: '',
  //           submenu: []
  //         },
  //         {
  //           path: '/apps/import-export/export',
  //           title: 'Export',
  //           iconType: '',
  //           icon: '',
  //           iconTheme: '',
  //           submenu: []
  //         },
  //       ]
  //     },
  //     {
  //       path: '/apps/supports',
  //       title: 'Supports',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: [{
  //           path: '/apps/supports/support',
  //           title: 'Support',
  //           iconType: '',
  //           icon: '',
  //           iconTheme: '',
  //           submenu: []
  //         },
  //         {
  //           path: '/apps/supports/add-support',
  //           title: 'Add Support',
  //           iconType: '',
  //           icon: '',
  //           iconTheme: '',
  //           submenu: []
  //         },
  //         {
  //           path: '/apps/supports/view-support',
  //           title: 'View Support',
  //           iconType: '',
  //           icon: '',
  //           iconTheme: '',
  //           submenu: []
  //         },
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: '',
  //   title: 'UI Elements',
  //   iconType: 'nzIcon',
  //   iconTheme: 'outline',
  //   icon: 'layout',
  //   submenu: [
  //     {
  //       path: '/demo/components/alert/en',
  //       title: 'Alert',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/auto-complete/en/',
  //       title: 'Autocomplete',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/avatar/en',
  //       title: 'Avatar',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/badge/en',
  //       title: 'Badge',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/breadcrumb/en',
  //       title: 'Breadcrumb',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/button/en',
  //       title: 'Button',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/calendar/en',
  //       title: 'Calendar',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/card/en',
  //       title: 'Cards',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/carousel/en',
  //       title: 'Carousel',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/cascader/en/',
  //       title: 'Cascader',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/checkbox/en/',
  //       title: 'Checkbox',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/collapse/en/',
  //       title: 'Collapse',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/comment/en/',
  //       title: 'Comment',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/date-picker/en/',
  //       title: 'DatePiker',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/drawer/en/',
  //       title: 'Drawer',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/dropdown/en/',
  //       title: 'Dropdown',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/empty/en/',
  //       title: 'Empty',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/form/en/',
  //       title: 'Form',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/grid/en/',
  //       title: 'Grid',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/input/en/',
  //       title: 'Input',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/list/en/',
  //       title: 'List',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/menu/en/',
  //       title: 'Menu',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/message/en/',
  //       title: 'Message',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/modal/en/',
  //       title: 'Modal',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/notification/en/',
  //       title: 'Notification',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/rate/en/',
  //       title: 'Rate',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/progress/en',
  //       title: 'Progress',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/radio/en',
  //       title: 'Radio',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //     {
  //       path: '/demo/components/skeleton/en',
  //       title: 'Skeleton',
  //       iconType: '',
  //       icon: '',
  //       iconTheme: '',
  //       submenu: []
  //     },
  //   ]
  // },
  
  {
    path: '',
    title: 'Authentication',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'lock',
    submenu: [{
        path: '/authentication/login-1',
        title: 'Log In',
        iconType: '',
        icon: '',

        iconTheme: '',
        submenu: []
      },
      {
        path: '/authentication/sign-up-1',
        title: 'Sign Up',
        iconType: '',
        icon: '',

        iconTheme: '',
        submenu: []
      },
      {
        path: '/authentication/forget-pass',
        title: 'Forget password',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },
      {
        path: '/authentication/login-1',
        title: 'logout',
        iconType: '',
        icon: '',
        iconTheme: '',
        submenu: []
      },

    ]
  }
]
