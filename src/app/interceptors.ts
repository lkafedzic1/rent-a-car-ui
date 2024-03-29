import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './core/services/interceptor/auth.interceptor';

export const interceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
