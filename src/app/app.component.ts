import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from './_services/authentication.service';
import {User} from './_models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'VM web UI';
  title = 'title app.component.ts';
  currentUser: User;

  constructor( private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

}

