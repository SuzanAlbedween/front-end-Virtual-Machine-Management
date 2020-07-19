import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import {AlertService} from '../_services/alert.service';
import {OperatingSystem} from '../_models/OS';
import {enableProdMode} from '@angular/core';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgModel} from '@angular/forms';
import {RAM} from '../_models/RAM';
import {VM} from '../_models/VM';
import {VMMService} from '../_services/vmm.service';
import {GlobalConstants} from '../common/global-constants';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  startDate: number;
  today = new Date();
  firstDate: number;
  submitted = false;
  OsArr: OperatingSystem[];
  AmountOfRam: RAM[];
  // RAM
  DefaultRamSelected: number;
  // OperatingSystem'/'
  DefaultSelected: number;
  CurrentOs: string;
  CurrentRam: string;
  model: any;
  vmobj = new VM();
  diffDays: number;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private alertService: AlertService , private vmmService: VMMService) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      VirtualMachineName: ['', Validators.required],
      OperatingSystem: [null, [ Validators.required ] ],
      RAM: [null, [ Validators.required ] ],
     Storage: ['', Validators.required],
      lifetime: [ '', Validators.required ] ,
      VirtualHardDisk: ['', Validators.required],
      Status: ['']});
    this.OsArr = [
      {id: 1, name: 'windows' },
      { id: 2, name: 'linux' },
      {id: 3, name: 'ubuntuGuest'}
    ];
    this.DefaultSelected = 2;
    this.AmountOfRam = [
      {id: 1, size: '1 GB'},
      {id: 2, size: '2 GB'},
      {id: 3, size: '3 GB'},
      {id: 4, size: '4 GB'},
      {id: 5, size: '5 GB'}
    ];
    this.DefaultRamSelected = 1;
    this.startDate = this.today.getDate();
  }
  // convenience getter for easy access to form fields
  get ff() {
    return this.createForm.controls;
  }
  onOperatingSystemSelected(val: any) {
    this.CurrentOs = val;
    console.log(this.CurrentOs);
  }
  onRamSelected(val: any) {
    this.CurrentRam = val;
    console.log(this.CurrentRam);
  }
  number_of_days(secondDate: number) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    this.firstDate = this.today.getTime();
    console.log('get time is ', this.firstDate);
    this.diffDays = Math.round(Math.abs((this.firstDate - secondDate)) / oneDay);
    return this.diffDays;

  }
  onSubmit_create() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.createForm.invalid) {
      console.log('Form no Submitted!');
      return;
    }
    this.loading = true;
    console.log('*****valusesss', this.createForm.value);
    this.vmobj.VMname = this.ff.VirtualMachineName.value;
    this.vmobj.OperatingSystem = this.ff.OperatingSystem.value;
    this.vmobj.Ram = this.ff.RAM.value;
    this.vmobj.Storage = this.ff.Storage.value;
    this.vmobj.LifeTime = (this.number_of_days(this.ff.lifetime.value)).toString();
    console.log('time number is ', this.vmobj.LifeTime);
    this.vmobj.pathiso = this.ff.VirtualHardDisk.value;
    this.vmobj.Status = this.ff.Status.value;
    this.vmobj.username = GlobalConstants.gusername;
    console.log('this username in create form ', this.vmobj.username);
    this.vmobj.password = GlobalConstants.gpassword;
    console.log('this password in create form ', this.vmobj.password);
    this.vmobj.host = GlobalConstants.ghost;
    this.vmmService.Create_NewVM(this.vmobj).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Virtual machine created successfully', true);
          this.router.navigate(['/Home']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });


    }
}
