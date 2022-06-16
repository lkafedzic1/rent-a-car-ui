import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {BlockUIModule} from 'ng-block-ui';
import {CarCardComponent} from './components/car-card/car-card.component';
import {MaterialModule} from '../material.module';
import {LoginComponent} from './components/login/login.component';
import {ReservationComponent} from './components/reservation/reservation.component';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {FooterComponent} from './components/footer/footer.component';
import {interceptorProviders} from './interceptors';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CarCardComponent,
    LoginComponent,
    ReservationComponent,
    AdminDashboardComponent,
    FooterComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    BlockUIModule.forRoot(),
  ],
  providers: [
    interceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
