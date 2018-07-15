import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../../shared/http-client.service';
import { SessionManagerService } from '../../shared/session-manager.service';
import { ProfileManagerService } from '../../shared/profile-manager.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {
  public loginForm: FormGroup;
  public email: FormControl = new FormControl('akroos@mail.com', Validators.compose([
    Validators.required,
    Validators.pattern('^[a-zA-Z]+[a-zA-Z0-9._+-]+@[a-z]+\.[a-z.]{2,5}$')
  ]));
  public password: FormControl = new FormControl('test1234', Validators.required);
  public loading: boolean;
  public errorMessage: string;
  constructor(
    public profileManager: ProfileManagerService,
    private http: HttpClientService,
    private sessionManager: SessionManagerService,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit() {}

  login() {
    if(this.loading) {
      return;
    } else if(this.loginForm.valid) {
      this.loading = true;
      this.http.requestLogin(this.email.value, this.password.value).map(res => res.json()).subscribe(
        profile => {
          let token = profile.token;
          this.sessionManager.saveSession(token);
          this.router.navigate(['dashboard']);
        },
        error => {
          this.loading = false;
          if (error.status === 400) {
            this.errorMessage = error.json().message;
          } else {
            this.errorMessage = 'We were unable to authorize you. Please '
            + 'try again later';
          }
        });
    } else {
      Object.keys(this.loginForm.controls).some(control => {
        let formControl = this.loginForm.get(control);
        if (formControl.pristine) {
          formControl.markAsTouched();
          return true;
        }
        return false;
      });
    }
  }

}
