import { Component, OnInit } from '@angular/core';
import { UserManagerService } from '../shared/user-manager.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  public fields: any;
  public datas: any;
  public totalDN: number;
  public currentPage: number;
  public showModal: boolean;
  public dataDisplayNumber: number;
  public isEdit: boolean;
  public selectedUser: any;

  constructor(
    private userService: UserManagerService
  ) {
    this.dataDisplayNumber = 10;
    this.currentPage = 1;
    this.showModal = false;
    this.isEdit = false;

    this.fields = [
      {
        name: '',
        field: 'i',
        size: 10
      }, {
        name: 'NAME',
        field: 'name',
        size: 25
      }, {
        name: 'BUSINESS NAME',
        field: 'businessName',
        size: 25
      }, {
        name: 'EMAIL',
        field: 'email',
        size: 40
      }
    ];

    this.userService.getUserList(this.dataDisplayNumber, this.currentPage).subscribe( _users => {
      this.datas = _users;
      this.totalDN = this.userService.getUserCount();
    });

  }

  ngOnInit() {
  }

  addUser() {
    this.selectedUser = {};
    this.showModal = true;
    this.isEdit = false;
  }

  modalClosed() {
    this.showModal = false;
  }

  selectUserEvent( user ) {
    this.selectedUser = Object.assign({}, user);
    this.isEdit = true;
    this.showModal = true;
  }

  goPageForLoadData( pageNum ) {
    this.currentPage = pageNum;

    this.userService.getUserList(this.dataDisplayNumber, this.currentPage).subscribe ( _users => {
      this.datas = _users;
    });
  }

}
