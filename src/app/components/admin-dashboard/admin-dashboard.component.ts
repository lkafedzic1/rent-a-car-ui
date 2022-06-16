import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {Car} from '../../api/backend/model/car';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Reservation} from '../../api/backend/model/reservation';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  errorMessage = '';
  warningMessage = 'No cars found';
  selectedTabIndex = 0;
  message = '';
  cars: Car[] = [];
  reservations: Reservation[] = [];
  isAdminUser = false;
  selected = new FormControl(0);
  addNewCar: FormGroup = new FormGroup({});

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    if (!this.authService.isAdminUser()) {
      this.router.navigate(['/dashboard']);
    }
    this.isAdminUser = true;
    this.getAllCars();
    this.getAllReservations();
    this.addNewCar = new FormGroup({
      name: new FormControl('', Validators.required),
      passengerCount: new FormControl('', Validators.required),
      fuelType: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      transmissionType: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
    });
  }

  submit(): void {
    console.log('new car: ', this.addNewCar?.value);
    this.httpClient
      .post(`${environment.adminService}`, this.addNewCar.value)
      .pipe(tap((response: any) => {
          console.log('response from car: ', response);
          this.message = 'Successfully added a car';
          this.selected.setValue(0);
          this.processReponse(response, true);
        }, (errorResponse) => {
          this.errorMessage = errorResponse?.error?.message;
          if (!this.errorMessage) {
            this.errorMessage = 'Error while performing add car operation';
          }
        }
      )).subscribe();
  }

  public getAllCars(): void {
    this.errorMessage = '';
    console.log('getAllCars');
    this.httpClient
      .get(`${environment.adminService}`)
      .pipe(tap((response: any) => {
          console.log('response from getAllCars: ', response);
          this.cars = response;
          this.message = '';
        }, (errorResponse) => {
          this.errorMessage = errorResponse?.error?.message;
          if (!this.errorMessage) {
            this.errorMessage = 'Error while performing retrieving cars';
          }
        }
      )).subscribe();
  }

  public deleteCar(id: number): void {
    if (!id) {
      return;
    }
    this.errorMessage = '';
    console.log('deleteCar');
    this.httpClient
      .delete(`${environment.adminService}/${id}`)
      .pipe(tap((response: any) => {
          console.log('response from deleteCar: ', response);
          this.processReponse(response);
          this.message = '';
        }, (errorResponse) => {
          this.errorMessage = errorResponse?.error?.message;
          ;
          if (!this.errorMessage) {
            this.errorMessage = 'Error while performing deleting car with Id ' + id;
          }
        }
      )).subscribe();
  }

  public getAllReservations(): void {
    this.errorMessage = '';
    console.log('getAllReservations');
    this.httpClient
      .get(`${environment.reservationService}`)
      .pipe(tap((response: any) => {
          console.log('response from getAllReservations: ', response);
          this.reservations = response;
          this.message = '';
        }, (errorResponse) => {
          this.errorMessage = errorResponse?.error?.message;
          if (!this.errorMessage) {
            this.errorMessage = 'Error while performing retrieving reservations';
          }
        }
      )).subscribe();
  }

  public deleteReservation(id: number): void {
    if (!id) {
      return;
    }
    this.errorMessage = '';
    console.log('deleteReservation');
    this.httpClient
      .delete(`${environment.reservationService}/${id}`)
      .pipe(tap((response: any) => {
          console.log('response from deleteReservation: ', response);
          this.message = '';
          this.getAllReservations();
          this.getAllCars();
        }, (errorResponse) => {
          this.errorMessage = errorResponse?.error?.message;
          ;
          if (!this.errorMessage) {
            this.errorMessage = 'Error while performing deleting reservation with id ' + id;
          }
        }
      )).subscribe();
  }

  private processReponse(response: any, redirect = false): void {
    this.clearMessages();
    if (!environment.isDebugMode) {
      this.getAllReservations();
      this.getAllCars();
      this.router.navigate(['/admin-dashboard']);
    } else {
      if (response) {
        this.cars = response;
      }
      if (redirect) {
        this.router.navigate(['/admin-dashboard']);
      }
    }
  }

  selectedTab($event: MatTabChangeEvent): void {
    console.log($event);
    this.selectedTabIndex = $event.index;
    this.selected.setValue(this.selectedTabIndex);
  }

  clearMessages(): void {
    this.message = '';
    this.errorMessage = '';
  }
}
