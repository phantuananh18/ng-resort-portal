import { HttpHeaders } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { BaseEndpoint } from './base-endpoint.api';
import { map } from 'rxjs/operators';
import { Staff } from './../model/staff.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseEndpoint {
  header: HttpHeaders;
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super('Staff');
  }

  setHeader() {
    this.authService.onTokenChange().subscribe(
      token => {
          this.header = new HttpHeaders().set("Authorization", "Bearer " + token.getValue());
      })
  }

  get ListStaff() {
    this.setHeader()
    return this.http.get<Staff[]>(this.Root_URL, { headers: this.header })
  }

  getByID(id: string) {
    this.setHeader()
    return this.http.get<Staff>(this.Root_URL + id, { headers: this.header })
  }

  addStaff(staff: Staff) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'add', staff, { headers: this.header, responseType: 'text' })
  }

  updateStaff(staff: Staff) {
    this.setHeader()
    return this.http.post(this.Root_URL +'update', staff, { headers: this.header, responseType: 'text' })
  }

  removeStaff(id: string) {
    this.setHeader()
    return this.http.delete(this.Root_URL + id, { headers: this.header, responseType: 'text' })
  }
}
