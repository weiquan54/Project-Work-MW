import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

import { LMXRegistryComponent } from './lmx-registry/lmx-registry.component';
import { LMXCalculatorComponent } from './lmx-calculator/lmx-calculator.component';
import { LMXWeatherComponent } from './lmx-weather/lmx-weather.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: 'registration', component: LMXRegistryComponent },
  { path: 'calculator', component: LMXCalculatorComponent },
  { path: 'weather', component: LMXWeatherComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'login',component: LoginComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    LMXRegistryComponent,
    LMXCalculatorComponent,
    LMXWeatherComponent,
    ErrorPageComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
