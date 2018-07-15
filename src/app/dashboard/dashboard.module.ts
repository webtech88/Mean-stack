import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { dashboardRouting } from './dashboard.routing';

@NgModule({
  imports: [
    SharedModule,
    FlexLayoutModule,
    dashboardRouting
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
