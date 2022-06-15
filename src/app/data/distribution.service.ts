import { HttpHeaders } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { SupplyService } from './supply.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BaseEndpoint } from './base-endpoint.api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistributionService extends BaseEndpoint {
  header: HttpHeaders
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super('DistributionSP')
  }

  setHeader() {
    this.authService.onTokenChange().subscribe(
      token => {
          this.header = new HttpHeaders().set("Authorization", "Bearer " + token.getValue());
      })
  }

  GiveSp(model: { roomID: string, supplyID: string, count: number }) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'givesp4room', model, { headers: this.header, responseType: 'text'})
  }

  RemoveSP(model: { roomID: string, supplyID: string, count: number }) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'removespFromRoom', model, { headers: this.header, responseType: 'text'})
  }
}
