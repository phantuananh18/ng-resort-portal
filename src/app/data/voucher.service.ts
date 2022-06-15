import { NbAuthService } from '@nebular/auth';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { BaseEndpoint } from './base-endpoint.api';
import { Voucher } from './../model/voucher.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService extends BaseEndpoint {
  header: HttpHeaders;
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super('Voucher')
   }

  setHeader() {
    this.authService.onTokenChange().subscribe(
      token => {
          this.header = new HttpHeaders().set("Authorization", "Bearer " + token.getValue());
      })
  }

  get List() {
    return this.http.get<Voucher[]>(this.Root_URL)
  }

  getByID(id: string):Observable<Voucher>{
    return this.http.get<Voucher>(this.Root_URL + id)
  }

  addVoucher(voucher: Voucher) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'create', voucher, { headers: this.header, responseType: 'text'})
  }

  removeVoucher(code: string) {
    this.setHeader()
    return this.http.delete(this.Root_URL + code, { headers: this.header, responseType: 'text'})
  }

  updateVoucher(voucher: Voucher) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'edit', voucher, { headers: this.header, responseType: 'text'})
  }
}
