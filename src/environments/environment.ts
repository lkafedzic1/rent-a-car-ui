// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rootUrl: '/rent-a-car-ui/proxy',
  backend: 'http://localhost:9001',
  gateway: 'http://localhost:7000',
  userService: 'http://localhost:7000/user-service/users',
  invoiceService: 'http://localhost:7000/invoice-service/invoices',
  adminService: 'http://localhost:7000/admin-service/admin/cars',
  reservationService: 'http://localhost:7000/reservation-service/reservations',
  backendServiceEndpoint: '/service',
  isDebugMode: false,
  adminUser: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
