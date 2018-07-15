import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs/Rx';
import { HttpClientService } from './http-client.service';
import { CoeliacAppAPI } from './coeliac-app-api';

@Injectable()
export class UserManagerService {

  private store: BehaviorSubject<any> = new BehaviorSubject([]);
  private filtedstore: BehaviorSubject<any> = new BehaviorSubject([]);
  public totalDataNum: number;

  constructor(
    private http: HttpClientService
  ) {
    this.loadUsers();
  }

  addUser( user: any ) {
    return this.http.post( CoeliacAppAPI.ADD_NEW_USER, user );
  }

  updateUser( user: any ) {
    return this.http.put( CoeliacAppAPI.UPDATE_USER( user._id ), user );
  }

  loadUsers() {
    this.http.get(CoeliacAppAPI.GET_USERS).map(res => res.json()).subscribe(
        data => {
          this.totalDataNum = data.length;
          this.store.next(data);
        },
        err => {
          console.log(err);
        }
    );
  }

  getUserCount(): number {
    return this.totalDataNum;
  }

  getUserList( limit: number, currentPage: number ): Observable<any> {
    this.store.subscribe( _users => {
      const start = currentPage * limit - limit;
      const end = currentPage * limit;

      const users = _users.slice( start, end );
      this.filtedstore.next(users);
    });
    return this.filtedstore.asObservable();
  }

}
