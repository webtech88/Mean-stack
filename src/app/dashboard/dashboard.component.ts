import { Component, OnDestroy } from '@angular/core';
import { Profile } from '../shared/models/profile.model';
import { ProfileManagerService } from '../shared/profile-manager.service';
import { SessionManagerService } from '../shared/session-manager.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {

  private profile: Profile;
  private sub: Subscription;
  public routes: any;
  public menuTitle: String = 'DASHBOARD';
  constructor(
    private profileManager: ProfileManagerService,
    private sessionManager: SessionManagerService,
    private route: Router
  ) {
    this.sub = this.profileManager.store$.subscribe( profile => {
      this.profile = profile;
    });

    this.routes = [{
      path: '/dashboard/info',
      link: 'DASHBOARD',
      icon: 'dashboard',
      active: true
    }, {
      path: '/dashboard/items',
      link: 'ADD ITEM',
      icon: 'library_add',
      active: false
    }, {
      path: '/dashboard/users',
      link: 'MANAGE USERS',
      icon: 'group',
      active: false
    }];

    route.events.subscribe((val) => {
      this.routes.forEach( _route => {
        _route.active = false;
        if ( val.url.indexOf(_route.path) !== -1 ) {
          _route.active = true;
          this.menuTitle = _route.link;
        }
      });
    });
  }

  selectMenu(route) {
    this.routes.forEach( _route => {
      _route.active = false;
    });
    route.active = true;
    this.menuTitle = route.link;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.sessionManager.removeSession();
  }

}
