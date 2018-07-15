import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserManagerService } from '../../../shared/user-manager.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Input() isEdit: boolean;
  @Input() user: any;

  public userForm: FormGroup;
  public vName = new FormControl('', Validators.required);
  public vBusinessName = new FormControl('', Validators.required);
  public vEmail = new FormControl('',
    Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z]+[a-zA-Z0-9._+-]+@[a-z]+\.[a-z.]{2,5}$')
    ])
  );
  public vPassword = new FormControl('', Validators.required);

  public errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserManagerService
  ) {
    this.userForm = this.fb.group({
      vName: this.vName,
      vBusinessName: this.vBusinessName,
      vEmail: this.vEmail,
      vPassword: this.vPassword
    });
  }

  ngOnInit() {
  }

  destroy() {
    this.closeModal.emit('close');
  }

  updateUser() {
    if ( this.userForm.valid ) {
      if ( this.isEdit ) {
        this.userService.updateUser( this.user ).subscribe(res => {
          if (res.status === 200) {
            this.errorMessage = '';
            this.userService.loadUsers();
            this.destroy();
          }
        }, error => {
          if (error.status === 400) {
            this.errorMessage = error.json().message;
          } else {
            this.errorMessage = 'We were unable to complete your registration,'
            + ' please try again later.';
          }
        });
      } else {
        this.userService.addUser( this.user ).subscribe(res => {
          if (res.status === 201) {
            this.errorMessage = '';
            this.userService.loadUsers();
            this.destroy();
          }
        }, error => {
          if (error.status === 400) {
            this.errorMessage = error.json().message;
          } else {
            this.errorMessage = 'We were unable to complete your registration,'
            + ' please try again later.';
          }
        });
      }
    } else {
      console.log( 'error' );
    }
  }

}
