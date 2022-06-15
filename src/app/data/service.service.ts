import { NbAuthService } from '@nebular/auth';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { BaseEndpoint } from './base-endpoint.api';
import { Injectable } from '@angular/core';
import { Service } from '../model/service.model';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { id } from '@swimlane/ngx-charts';

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseEndpoint {
  header: HttpHeaders
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super('Service')
  }

  setHeader() {
    this.authService.onTokenChange().subscribe(
      token => {
        this.header = new HttpHeaders().set("Authorization", "Bearer " + token.getValue());
      })
  }

  get List() {
    return this.http.get<Service[]>(this.Root_URL)
  }

  getByID(id: string): Observable<Service> {
    return this.http.get<Service>(this.Root_URL + id)
  }

  addService(Service: Service) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'create', Service, { headers: this.header, responseType: 'text' })
  }

  removeService(ServiceID: string) {
    this.setHeader()
    return this.http.delete(this.Root_URL + ServiceID, { headers: this.header, responseType: 'text' })
  }

  updateService(service: Service) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'edit', service, { headers: this.header, responseType: 'text' })
  }
}
