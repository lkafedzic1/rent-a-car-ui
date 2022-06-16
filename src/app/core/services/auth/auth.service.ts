import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {User} from '../../../api/backend/model/user';
import {USERS} from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private _appToken = 'appToken';
  private _authTokenType = 'authTokenType';
  private _authToken = 'authToken';
  private _role = 'role';
  private _user = 'user';

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public get appToken(): string {
    return localStorage.getItem(this._appToken) || '';
  }

  public set appToken(value: string) {
    localStorage.setItem(this._appToken, value);
  }

  public get authTokenType(): string {
    return localStorage.getItem(this._authTokenType) || '';
  }

  public set authTokenType(value: string) {
    localStorage.setItem(this._authTokenType, value);
  }

  public get authToken(): string {
    return localStorage.getItem(this._authToken) || '';
  }

  public set authToken(value: string) {
    localStorage.setItem(this._authToken, value);
  }

  public get role(): string {
    return localStorage.getItem(this._role) || '';
  }

  public set role(value: string) {
    localStorage.setItem(this._role, value);
  }

  public set user(value: string) {
    localStorage.setItem(this._user, value);
  }

  public getTokenHeader(): string {
    if (!!this.authTokenType && !!this.authToken) {
      return this.authTokenType + ' ' + this.authToken;
    }
    return '';
  }

  public authenticate(userLoginRequest: any, error: any): void {
    this.httpClient
      .post(`${environment.userService}/login`, userLoginRequest)
      .pipe(tap((response: any) => {
          this.authTokenType = 'Bearer ';
          this.authToken = response?.token;
          if (this.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/login']);
          }
        }, (errorResponse) => {
          error = errorResponse?.error?.message;
        }
      )).subscribe();
  }

  public isAuthenticated(): boolean {
    return (!!this.authTokenType && !!this.authToken) || !!this.appToken || environment.isDebugMode;
  }

  public isAdminUser(): boolean {
    return !!this.role && this.role.toUpperCase() === 'ADMIN' || environment.adminUser;
  }

  public getLoggedInUser(): User | undefined {
    if (environment.isDebugMode) {
      return USERS.find(user => user?.role?.name === 'ADMIN');
    }
    const loggedInUserStr = localStorage.getItem(this._user);
    if (!!loggedInUserStr) {
      return JSON.parse(loggedInUserStr);
    } else {
      this.router.navigate(['/login']);
    }
    return undefined;
  }

  public unAuthenticate(): void {
    this.authToken = '';
    this.authTokenType = '';
    this.appToken = '';
    this.role = '';
    this.user = '';
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.unAuthenticate();
  }
}
