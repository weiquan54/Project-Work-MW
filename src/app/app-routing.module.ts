import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { LMXRegistryComponent } from './lmx-registry/lmx-registry.component';
import { LMXCalculatorComponent } from './lmx-calculator/lmx-calculator.component';
import { LMXWeatherComponent } from './lmx-weather/lmx-weather.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


const routes: Routes = [
  { path: 'Project-Work-MW/registration', component: LMXRegistryComponent },
  { path: 'Project-Work-MW/calculator', component: LMXCalculatorComponent },
  { path: 'Project-Work-MW/weather', component: LMXWeatherComponent },
  { path: 'Project-Work-MW/error', component: ErrorPageComponent },
  // { path: 'ERROR Page/Error', component: ErrorPageComponent },
  { path: 'Project-Work-MW/login', component: LoginComponent },
  // Add more routes as needed
  { path: '', redirectTo: 'Project-Work-MW//login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: 'Project-Work-MW//error', pathMatch: 'full' }, // Redirect for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule { }
