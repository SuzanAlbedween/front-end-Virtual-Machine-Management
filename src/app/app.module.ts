import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { AppRoutingModule , routeingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './_services/authentication.service';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    routeingComponents,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({timeOut: 600000, preventDuplicates: true, positionClass: 'toast-bottom-full-width'}) //
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

