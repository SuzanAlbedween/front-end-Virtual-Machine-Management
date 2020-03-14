import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService} from '../_services/authentication.service';
import {AlertService} from '../_services/alert.service';
import {User} from '../_models/user';
import {ToastrService} from 'ngx-toastr';
declare const myTest: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  disablefun = false;
  submitted = false;
  returnUrl = '/Home';
  objuser = new User();
  constructor(  private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService, private alertService: AlertService, private toastr: ToastrService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.disablefun = false;
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    // get return url from route parameters or default to '/'
  //  this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  // convenience getter for easy access to form fields
  get f() {
  return  this.loginForm.controls;
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  showtosterS() { this.toastr.error('No such user was found on the system !!!'); }
  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value)
    this.loading = true;
    this.objuser.name = this.f.username.value;
    this.objuser.password = this.f.password.value
    this.authenticationService.login(this.objuser)
      .pipe(first())
      .subscribe(
        async data => {
          console.log(data);
          if (data === 'True') {
            myTest();
            await this.delay(9000);
            this.router.navigate(['/Home']);
          } else {
            console.log('abbs');

            this.disablefun = true;
            this.loading = false;
          }
        });

  }


}
