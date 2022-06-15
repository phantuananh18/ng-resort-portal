import { HttpHeaders } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { BaseEndpoint } from './base-endpoint.api';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseEndpoint {
  header: HttpHeaders;
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super('Customer')
  }

  setHeader() {
    this.authService.onTokenChange().subscribe(
      token => {
          this.header = new HttpHeaders().set("Authorization", "Bearer " + token.getValue());
      })
  }

  get ListCustomer() {
    return this.http.get<Customer[]>(this.Root_URL)
  }

  getByID(id: string):Observable<Customer>{
    return this.http.get<Customer>(this.Root_URL + id)
  }

  addCustomer(Customer: Customer) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'create', Customer, { headers: this.header ,responseType: 'text'})
  }

  updateCustomer(customer: Customer) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'update', customer, { headers: this.header, responseType: 'text'})
  }

  deleteCustomer(id: string) {
    this.setHeader()
    return this.http.delete(this.Root_URL + id, { headers: this.header, responseType: 'text' })
  }
}
