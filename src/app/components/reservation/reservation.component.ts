import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Reservation} from '../../api/backend/model/reservation';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Car} from '../../api/backend/model/car';
import {User} from '../../api/backend/model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  public readonly reservationKey = 'reservation';
  @Input() reservation: any;
  @Output() deleteEvent = new EventEmitter();
  car: Car;
  user: User;
  errorMessage = '';
  message = '';
  isAdminUser = false;

  constructor(private httpClient: HttpClient, private router: Router,
              private authService: AuthService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.message = '';
    if (localStorage.getItem(this.reservationKey)) {
      const storedReservation = localStorage.getItem(this.reservationKey) || '';
      localStorage.setItem(this.reservationKey, '');
      this.reservation = JSON.parse(storedReservation);
      localStorage.setItem(this.reservationKey, '');
      console.log('local reservation: ', this.reservation);
      this.getCarDetails(this.reservation.carId);
      this.getUserDetails(this.reservation.userId);
      return;
    }
    localStorage.setItem(this.reservationKey, '');
    this.isAdminUser = this.authService.isAdminUser();
    if (environment.isDebugMode && !this.reservation) {
      this.startDebugMode();
    } else {
      this.getCarDetails(this.reservation.carId);
      this.getUserDetails(this.reservation.userId);
    }
  }

  public getCarDetails(id: number): void {
    if (!id) {
      return;
    }
    this.errorMessage = '';
    console.log('getCarDetails');
    this.httpClient
      .get(`${environment.adminService}/${id}`)
      .pipe(tap((response: any) => {
          console.log('response from getCarDetails: ', response);
          this.car = response;
          this.message = '';
        }, (errorResponse) => {
          this.errorMessage = errorResponse;
          if (!this.errorMessage) {
            this.errorMessage = 'Error while performing retrieving car details';
          }
        }
      )).subscribe();
  }

  public getUserDetails(id: number): void {
    if (!id) {
      return;
    }
    this.errorMessage = '';
    console.log('getUserDetails');
    this.httpClient
      .get(`${environment.userService}/${id}`)
      .pipe(tap((response: any) => {
          console.log('response from getUserDetails: ', response);
          this.user = response;
          this.message = '';
        }, (errorResponse) => {
          this.errorMessage = errorResponse;
          if (!this.errorMessage) {
            this.errorMessage = 'Error while performing retrieving user details';
          }
        }
      )).subscribe();
  }

  submit(): void {
    console.log('add new reservation: ', this.reservation);
    this.reservation.price = this.car.price;
    this.httpClient
      .post(`${environment.reservationService}`, this.reservation)
      .pipe(tap((response: any) => {
          console.log('response from reservation: ', response);
          this.message = 'Successfully added new reservation';
        }, (errorResponse) => {
          this.errorMessage = errorResponse?.error?.message;
          if (!this.errorMessage) {
            this.errorMessage = 'Error while performing add reservation operation';
          }
        }
      )).subscribe();
  }

  public startDebugMode(): void {
    if (!environment.isDebugMode) {
      return;
    }
    this.errorMessage = '';
    console.log('getAllReservations');
    this.httpClient
      .get(`${environment.reservationService}`)
      .pipe(tap((response: any) => {
          console.log('response from getAllReservations: ', response);
          if (!!response && response.length > 0) {
            this.reservation = response[0];
            console.log('debug reservation : ', this.reservation);
            this.getCarDetails(this.reservation.carId);
            this.getUserDetails(this.reservation.userId);
          }
          this.message = '';
        }, (errorResponse) => {
          this.errorMessage = errorResponse?.error?.message;
          if (!this.errorMessage) {
            this.errorMessage = 'Error while performing retrieving reservations';
          }
        }
      )).subscribe();
  }

  delete(reservation: Reservation): void {
    this.deleteEvent.emit(reservation.id);
  }
}
