import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  isSignedIn = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isSignedIn = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.unAuthenticate();
  }

}
