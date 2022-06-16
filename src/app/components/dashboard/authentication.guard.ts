import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {


  constructor(public router: Router, private authService: AuthService) {
  }

  canActivate(): boolean {
    if (this.authService.isAdminUser()) {
      this.router.navigate(['/admin-dashboard']);
      return false;
    }
    return true;
  }
}
