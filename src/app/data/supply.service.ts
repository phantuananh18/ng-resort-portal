import { HttpHeaders } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { BaseEndpoint } from './base-endpoint.api';
import { Supply } from './../model/supply.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplyService extends BaseEndpoint{
  header: HttpHeaders
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super('Supply')
  }

  setHeader() {
    this.authService.onTokenChange().subscribe(
      token => {
          this.header = new HttpHeaders().set("Authorization", "Bearer " + token.getValue());
      })
  }

  get List() {
    return this.http.get<Supply[]>(this.Root_URL)
  }

  getByID(id: string) {
    return this.http.get<Supply>(this.Root_URL + id)
  }

  addSupply(Supply: Supply) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'create', Supply, { headers: this.header, responseType: 'text'})
  }

  removeSupply(SupplyID: string) {
    this.setHeader()
    return this.http.delete(this.Root_URL + SupplyID, { headers: this.header, responseType: 'text'})
  }

  updateSupply(model: {id:string, name:string, editType: string, count: number}) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'edit', model, { headers: this.header, responseType: 'text'})
  }
}
