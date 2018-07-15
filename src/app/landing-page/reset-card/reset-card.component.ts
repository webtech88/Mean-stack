import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from '../../shared/http-client.service';
import { CoeliacAppAPI } from '../../shared/coeliac-app-api';

@Component({
  selector: 'app-reset-card',
  templateUrl: './reset-card.component.html',
  styleUrls: ['./reset-card.component.scss']
})
export class ResetCardComponent implements OnInit {
  public resetForm: FormGroup;
  public email: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.pattern(/^[a-zA-Z]+[a-zA-Z0-9._+-]+@[a-z]+\.[a-z.]{2,5}$/)
  ]));
  public password: FormControl = new FormControl('', Validators.required);
  public confirmPassword: FormControl = new FormControl('');
  public loading: boolean = false;
  public errorMessage: string;
  public confirmationCode: string;
  public emailSent: boolean = false;
  constructor(
    public http: HttpClientService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.resetForm = this.fb.group({
      password: this.password,
      confirmPassword: this.confirmPassword
    }, { validator: () => {
      if(this.password.value !== this.confirmPassword.value) {
        return {
          validateEqual: false
        };
      }
      return null;
    }});

  }

  ngOnInit() {
    this.route.params.pluck('code').subscribe((code:string) => {
      this.confirmationCode = code;
    });
  }

  requestPassword() {
    return this.http.post(CoeliacAppAPI.AUTH_RESET, {
      email: this.email.value
    });
  }

  confirmCode(code: string) {
    return this.http.post(CoeliacAppAPI.AUTH_CONFIRM_RESET(code), {
      password: this.password.value
    });
  }

  submitConfirmForm() {
    if(this.loading) {
      return;
    } else if(this.resetForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.confirmCode(this.confirmationCode).subscribe(res => {
        this.loading = false;
        this.emailSent = true;
      }, e => {
        this.loading = false;
        this.errorMessage = e.json().message;
      });
    } else {
      Object.keys(this.resetForm.controls).forEach(control => {
        this.resetForm.get(control).markAsTouched();
      });
    }
  }

  submitForm() {
    if (this.loading) {
      console.log(this.loading);
      return;
    } else if (this.email.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.requestPassword().take(1).subscribe(() => {
        this.loading = false;
        this.emailSent = true;
      }, e => {
        this.loading = false;
        let error = e.json();
        if (error.error === 1015) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'We were unable to reset your password, ' +
          'please contact LittleVista support';
        }
      });
    } else {
      this.email.markAsTouched();
    }
  }

}
