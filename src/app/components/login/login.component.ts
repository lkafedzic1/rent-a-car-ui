import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup({});
  signInForm: FormGroup = new FormGroup({});
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();
  newAccount = false;
  message = '';

  constructor(private router: Router, private httpClient: HttpClient, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });


    this.email = new FormControl('', {validators: [Validators.required, Validators.email], updateOn: 'blur'});
    this.password = new FormControl('', Validators.required);
    this.signInForm.addControl('email', this.email);
    this.signInForm.addControl('password', this.password);
  }

  submit(): void {
    console.log('value: ', this.signUpForm?.value);
    this.httpClient
      .post(`${environment.userService}`, this.signUpForm.value, {headers: {Authorization: 'Bearer ' + btoa(`${this.signUpForm.get('email')?.value}:${this.signUpForm.get('password')?.value}`)}})
      .pipe(tap((response: any) => {
          this.authService.authTokenType = 'Bearer ';
          this.authService.authToken = response.token;
          if (this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/login']);
          }
        }, (errorResponse) => {
          this.message = errorResponse?.error?.message;
        }
      )).subscribe();
  }

  switchContext(): void {
    this.newAccount = true;
  }

  login(): void {
    this.message = '';
    console.log('login', btoa(`${this.signInForm.get('email')?.value}:${this.signInForm.get('password')?.value}`));
    this.httpClient
      .get(`${environment.userService}/login`, {headers: {Authorization: 'Bearer ' + btoa(`${this.signInForm.get('email')?.value}:${this.signInForm.get('password')?.value}`)}})
      .pipe(tap((response: any) => {
          if (this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/login']);
          }
        }, (errorResponse) => {
          this.message = errorResponse?.error?.message;
        }
      )).subscribe();
  }
}
