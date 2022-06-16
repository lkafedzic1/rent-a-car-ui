import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../core/services/auth/auth.service';
import {Car} from '../../api/backend/model/car';
import {User} from '../../api/backend/model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit {

  @Input() car: Car;
  @Output() deleteEvent = new EventEmitter();
  @Output() rentNowEvent = new EventEmitter();

  isAdminUser = false;


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdminUser();
  }

  deleteCar(car: Car): void {
    this.deleteEvent.emit(car.id);
  }

  rentNow(): void {
    console.log('rent now');
    const loggedInUser = this.authService.getLoggedInUser();
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      console.log('No user logged in routing to login page');
      return;
    }

    console.log('Found user logged in routing to reservation page');
    this.rentNowEvent.emit({userId: loggedInUser?.id, carId: this.car.id});
  }
}
