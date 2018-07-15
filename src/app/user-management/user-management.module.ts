import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserManagementComponent } from './user-management.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { routing } from './user-management.routing';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    routing
  ],
  declarations: [UserManagementComponent, AddUserComponent]
})
export class UserManagementModule { }
