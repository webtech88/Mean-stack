import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MdlModule } from 'angular2-mdl';
import { MdlSelectModule } from '@angular2-mdl-ext/select';
import { FlexLayoutModule } from '@angular/flex-layout';

// Shared Providers
import { HttpClientService } from './http-client.service';
import { SessionManagerService } from './session-manager.service';
import { ProfileManagerService } from './profile-manager.service';
import { UserManagerService } from './user-manager.service';
import { CookieService, BaseCookieOptions, CookieOptions } from 'angular2-cookie/core';

// Shared Components
import { NavbarComponent } from './components/navbar/';
import { NavbarSmallComponent } from './components/navbar-small/';
import { ModalComponent } from './components/modal/';
import { SearchbarComponent } from './components/searchbar/';
import { ConfirmDialogComponent } from './components/confirm-dialog/';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { FlexCardComponent } from './components/flex-card/flex-card.component';
import { CoeliacTableComponent } from './components/coeliac-table/coeliac-table.component';


export function cookieServiceFactory() {
  return new CookieService();
}

const sharedProviders = [
  HttpClientService,
  SessionManagerService,
  ProfileManagerService,
  UserManagerService,
  { provide: CookieService, useFactory: cookieServiceFactory },
  { provide: CookieOptions, useValue: BaseCookieOptions }
];

const sharedComponents = [
  NavbarComponent,
  NavbarSmallComponent,
  ModalComponent,
  SearchbarComponent,
  ConfirmDialogComponent,
  DatepickerComponent,
  FlexCardComponent,
  CoeliacTableComponent
];

@NgModule({
  imports: [
    CommonModule,
    MdlModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    ...sharedComponents
  ],
  exports: [
    CommonModule,
    MdlModule,
    MdlSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ...sharedComponents
  ],
  providers: [
    ...sharedProviders
  ]
})
export class SharedModule { }
