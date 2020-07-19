import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AboutComponent} from './about/about.component';
import {LoginComponent} from './login/login.component';
import {CreateComponent} from './create/create.component';
import {HomeComponent} from './home/home.component';
import {RegistrationComponent} from './registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent},
  { path: 'Create', component: CreateComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Registration', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routeingComponents = [HomeComponent, CreateComponent, LoginComponent, RegistrationComponent, AboutComponent]
