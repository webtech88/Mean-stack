import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { UserManagementComponent } from './user-management.component';

const userManagementRouting = [
  {
    path: '',
    component: UserManagementComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(userManagementRouting);
