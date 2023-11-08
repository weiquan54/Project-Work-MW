import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { LMXRegistryComponent } from './lmx-registry/lmx-registry.component';
import { LMXCalculatorComponent } from './lmx-calculator/lmx-calculator.component';
import { LMXWeatherComponent } from './lmx-weather/lmx-weather.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: 'registration', component: LMXRegistryComponent },
  { path: 'calculator', component: LMXCalculatorComponent },
  { path: 'weather', component: LMXWeatherComponent },
  { path: 'error', component: ErrorPageComponent },
  // { path: 'ERROR Page/Error', component: ErrorPageComponent },
  { path: 'login', component: LoginComponent },
  // Add more routes as needed
  // { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
  { path: '', redirectTo: '/calculator', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/error', pathMatch: 'full' }, // Redirect for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
