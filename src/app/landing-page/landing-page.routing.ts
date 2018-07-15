import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page.component';
import { LoginCardComponent } from './login-card/login-card.component';
import { RegisterCardComponent } from './register-card/register-card.component';
import { ResetCardComponent } from './reset-card/reset-card.component';

const landingPageRouting = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginCardComponent
      },
      {
        path: 'register',
        component: RegisterCardComponent
      },
      {
        path: 'reset-password',
        redirectTo: 'reset-password/'
      },
      {
        path: 'reset-password/:code',
        component: ResetCardComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(landingPageRouting);
