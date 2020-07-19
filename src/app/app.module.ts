import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { AppRoutingModule , routeingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './_services/authentication.service';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {VMMService} from './_services/vmm.service';
import {CdkTableModule} from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';



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
    ToastrModule.forRoot({timeOut: 600000, preventDuplicates: true, positionClass: 'toast-bottom-full-width'}),
    FormsModule, NgbModule, MatSliderModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule,
    // tslint:disable-next-line:max-line-length
    MatButtonModule, MatCardModule, MatRadioModule, MatCheckboxModule, MatSelectModule, NgbAlertModule, CdkTableModule, MatTableModule, MatIconModule
  ],
  providers: [AuthenticationService , VMMService],
  bootstrap: [AppComponent],
  exports: [
    MatTableModule]
})
export class AppModule { }
