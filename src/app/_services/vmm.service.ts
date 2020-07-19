import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {VM} from '../_models/VM';
import {User} from '../_models/user';
import {GlobalConstants} from '../common/global-constants';
import {AllVM} from '../_models/AllVM';
import { HttpHeaders } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class VMMService {
  vmobj: string;


  constructor(private http: HttpClient) { }

  Create_NewVM(vmobj: VM) {
    return this.http.post( GlobalConstants.apiUrl + '/VMM', vmobj);

  }
 Get_All_VMs(): Observable<[]> {
   const params = new HttpParams()
    .set('username', GlobalConstants.gusername)
      .set('password', GlobalConstants.gpassword)
    .set('host', GlobalConstants.ghost);
   console.log('service is', params.toString());
   return this.http.get<[]>(GlobalConstants.apiUrl + '/VMM', {params});

  }
}
