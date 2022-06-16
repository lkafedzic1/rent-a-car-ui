import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../../../environments/environment';
import {CARS, RESERVATIONS, USERS} from '../../constants/constants';
import {Car} from '../../../api/backend/model/car';
import {Reservation} from '../../../api/backend/model/reservation';

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly HEADER_ACCESS_TOKEN_TYPE = 'Bearer';
  private readonly AUTH_HEADER = 'Authorization';
  private readonly ROLE_KEY = 'role';
  private readonly UI_PROXY = '/rent-a-car-ui/api/proxy';
  private readonly UI_PROXY_AUTH = '/login';
  private removedCars = [];

  constructor(private readonly authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes(environment.gateway)) {
      const appToken = this.authService.appToken;
      const tokenHeader = this.authService.getTokenHeader();


      if (!!tokenHeader) {
        request = request.clone({
          setHeaders: {
            Authorization: tokenHeader,
            'Access-Control-Allow-Origin': '*',
            Accept: '*/*'
          },
        });
      } else if (!!appToken) {
        request = request.clone({
          setHeaders: {
            Authorization: appToken,
            'Access-Control-Allow-Origin': '*',
            Accept: '*/*'
          },
        });
      } else {
        request = request.clone({
          setHeaders: {'Access-Control-Allow-Origin': '*', Accept: '*/*'}
        });
      }

      if (request.url.includes(this.UI_PROXY_AUTH)) {

        return next.handle(request).pipe(
          tap(response => {
            if (response instanceof HttpResponse && !!response?.body) {

              if (response?.body?.hasOwnProperty(this.ROLE_KEY)) {
                this.authService.appToken = request.headers.get(this.AUTH_HEADER) || '';
                this.authService.role = response?.body?.role?.name;
                this.authService.user = JSON.stringify(response.body);
              }
            }
          })
        );
      }
    }

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize())
      .pipe();

    // tslint:disable-next-line:typedef
    function handleRoute() {

      let deletedReservation = localStorage.getItem('deletedRervations');
      const deletedUsers = localStorage.getItem('deletedUsers');
      switch (true) {
        case ((request.url === (environment.adminService)) && (request.method === METHOD.GET) && environment.isDebugMode):
          return of(new HttpResponse({status: 200, body: getAllCars()}));
        case ((request.url.includes('/search')) && (request.url.includes('from')) && (request.url.includes('to'))
          && (request.method === METHOD.GET) && environment.isDebugMode):
          return of(new HttpResponse({status: 200, body: CARS}));
        case ((request.url.includes(environment.adminService)) && (request.method === METHOD.GET) && environment.isDebugMode):
          const carId = request.url.split('/').pop();
          return of(new HttpResponse({status: 200, body: CARS.find(carObj => carObj.id?.toString() === carId)}));
        case ((request.url === (environment.reservationService)) && (request.method === METHOD.GET) && environment.isDebugMode):
          localStorage.setItem('deletedRervations', '');
          return of(new HttpResponse({status: 200, body: RESERVATIONS}));
        case ((request.url.includes(environment.reservationService)) && (request.method === METHOD.GET) && environment.isDebugMode):
          const reservationId = request.url.split('/').pop();
          return of(new HttpResponse({status: 200, body: RESERVATIONS.find(reser => reser.id?.toString() === reservationId)}));
        case ((request.url === (environment.userService)) && (request.method === METHOD.GET) && environment.isDebugMode):
          localStorage.setItem('deletedUsers', '');
          return of(new HttpResponse({status: 200, body: USERS}));
        case ((request.url.includes(environment.userService)) && (request.method === METHOD.GET) && environment.isDebugMode):
          const userId = request.url.split('/').pop();
          return of(new HttpResponse({status: 200, body: USERS.find(user => user.id?.toString() === userId)}));
        case ((request.url.includes(environment.adminService)) && (request.method === METHOD.POST) && environment.isDebugMode):
          const cars = getAllCars();
          cars.push(request.body);
          return of(new HttpResponse({status: 200, body: cars}));
        case ((request.url.includes(environment.reservationService)) && (request.method === METHOD.POST) && environment.isDebugMode):
          return of(new HttpResponse({status: 200, body: null}));
        case ((request.url.includes(environment.adminService)) && (request.method === METHOD.DELETE) && environment.isDebugMode):
          const id = request.url.split('/').pop();
          const deleletedCars = localStorage.getItem('deletedCars') + ',' + id;
          localStorage.setItem('deletedCars', deleletedCars);
          return of(new HttpResponse({
            status: 200,
            body: getAllCars().filter((car: Car) => !deleletedCars.split(',').includes(car.id?.toString()))
          }));
        case ((request.url.includes(environment.reservationService)) && (request.method === METHOD.DELETE) && environment.isDebugMode):
          const reservId = request.url.split('/').pop();
          localStorage.setItem('deletedRervations', deletedReservation + ',' + reservId);
          deletedReservation = localStorage.getItem('deletedRervations');
          return of(new HttpResponse({
            status: 200,
            body: RESERVATIONS.filter((resrv: Reservation) => !deletedReservation?.split(',').includes(resrv.id?.toString() || ''))
          }));
        default:
          return next.handle(request);
      }
    }

    function getAllCars(): any {
      return CARS;
    }
  }
}
