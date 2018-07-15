import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const dashboardRoutes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{
        path: '',
        redirectTo: 'info',
      }, {
        path: 'users',
        loadChildren: 'app/user-management/user-management.module#UserManagementModule'
      }, {
        path: 'items',
        loadChildren: 'app/item-management/item-management.module#ItemManagementModule'
      }, {
        path: 'info',
        loadChildren: 'app/dashboard-info/dashboard-info.module#DashboardInfoModule'
      }]
  }
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);
