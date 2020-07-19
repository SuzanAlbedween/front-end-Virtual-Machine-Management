import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import {VMMService} from '../_services/vmm.service';
import { MatTableDataSource } from '@angular/material/table';
import {VM} from '../_models/VM';
import {GlobalConstants} from '../common/global-constants';
import {AllVM} from '../_models/AllVM';
import {first} from 'rxjs/operators';
import {AlertService} from '../_services/alert.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public displayedColumns = ['name'];
 // public VMdata = new MatTableDataSource<VM>();
  listData: MatTableDataSource<object>;
  virtualmachines: VM[];
  loading = false;
  errorMessage = '';
lsvm: any [];
  newVM: VM;





  constructor(private vmmService: VMMService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
  }
  ConvertToObjJson( val: any) {
    const arr = [];
    let bank
    val = val.replace(('[' + '\'' + '{'), '{');
    val = val.replace(('}' + '\'' ), '}');
    val = val.replace(('\'' + '{'), '{');
    val = val.replace(('}' + '\'' + ']'), '}');
    val = val.split('},');
    // TODO...
    // tslint:disable-next-line:forin
    for (const i in val) {
      bank = Object.entries(val[i]);
      arr.push(bank);
    }
    console.log('banks arr \n\n', arr)
    return val;
  }
  ShowData() {
    this.loading = true;
    this.vmmService.Get_All_VMs().pipe(first())
      .subscribe(
        res => {
          console.log('The result of the request\n', res);
          this.lsvm = this.ConvertToObjJson(res);
          console.log('the data source', this.lsvm);
          this.listData = new MatTableDataSource(this.lsvm);
        },
        error => {
          this.loading = false;
          this.alertService.error(error);
        },
        () => {this.loading = false; });
  }
}

