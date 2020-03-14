import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(  private router: Router) { }

  ngOnInit(): void {
  }
  fun1() {
    this.router.navigate(['/Create']);
  }

}
