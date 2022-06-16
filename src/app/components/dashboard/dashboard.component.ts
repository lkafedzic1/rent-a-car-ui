import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Reservation} from '../../api/backend/model/reservation';
import {Address} from '../../api/backend/model/address';
import {Router} from '@angular/router';
import {ReservationComponent} from '../reservation/reservation.component';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  message = '';
  cars = [];
  searchForm: FormGroup = new FormGroup({});

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      address: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required)
    });
  }

  public search(): void {
    this.message = '';
    console.log('search', this.searchForm.value);
    const from = formatDate(this.searchForm.get('from')?.value, 'yyyy-MM-dd', 'en-US');
    const to = formatDate(this.searchForm.get('to')?.value, 'yyyy-MM-dd', 'en-US');
    this.httpClient
      .get(`${environment.adminService}/search?address=${this.searchForm.get('address')?.value}&from=${from}&to=${to}`)
      .pipe(tap((response: any) => {
          this.cars = response;
        }, (errorResponse) => {
          this.message = errorResponse?.error?.message;;
          if (!this.message) {
            this.message = 'Error while performing search';
          }
        }
      )).subscribe();
  }

  submit(): void {
    console.log('value: ', this.searchForm?.value);
  }

  rentNow($event: any): void {
    if (!!$event.carId && !!$event.userId) {
      const addressComponents = this.searchForm.get('address')?.value.split(',');
      const address: Address = {city: '', country: '', street: ''};
      if (addressComponents?.length > 0) {
        address.street = addressComponents[0];
      }
      if (addressComponents?.length > 1) {
        address.city = addressComponents[1];
      }
      if (addressComponents?.length > 2) {
        address.country = addressComponents[2];
      }

      const reservation: Reservation = {
        carId: $event.carId,
        userId: $event.userId,
        address,
        fromDate: this.searchForm.get('from')?.value,
        toDate: this.searchForm.get('to')?.value
      };
      console.log('reservation being processed: ', reservation);
      localStorage.setItem('reservation', JSON.stringify(reservation));
      this.router.navigate(['/reservation'], {state: {data: reservation}});
    }
  }
}
