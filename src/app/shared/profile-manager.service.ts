import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs/Rx';
import { Profile } from './models/profile.model';
import { HttpClientService } from './http-client.service';
import { CoeliacAppAPI } from './coeliac-app-api';
import { SessionManagerService } from './session-manager.service';

@Injectable()
export class ProfileManagerService {
  private profile: Profile;
  private store: BehaviorSubject<Profile> = new BehaviorSubject(this.profile);
  constructor(private http: HttpClientService, private sessionManager: SessionManagerService) {

    this.sessionManager.session$.subscribe(authState => {
      if (authState.authorized) {
        this.loadProfile();
      }
    });
  }

  loadProfile() {
    this.http.get(CoeliacAppAPI.GET_PROFILE).map(res => res.json()).subscribe(
        data => {
          this.store.next(data);
        },
        err => {
          console.log(err);
        }
    );
  }

  get store$(): Observable<Profile> {
    return this.store.asObservable();
  }
}
