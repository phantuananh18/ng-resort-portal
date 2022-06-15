import { NbAuthService } from '@nebular/auth';
import { HttpHeaders } from '@angular/common/http';
import { BaseEndpoint } from './base-endpoint.api';
import { HttpClient } from '@angular/common/http';
import { RoomType } from './../model/room-type.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService extends BaseEndpoint {
  header: HttpHeaders;
  constructor(private http: HttpClient, private authService: NbAuthService) {
    super('RoomType')
  }

  setHeader() {
    this.authService.onTokenChange().subscribe(
      token => {
        console.log("[RoomType] Header Token -> " + token)
        this.header = new HttpHeaders().set("Authorization", "Bearer " + token.getValue());
      })
  }

  get List() {
    return this.http.get<RoomType[]>(this.Root_URL)
  }

  getByID(id: string) {
    return this.http.get<RoomType>(this.Root_URL + id);
  }

  addRoomType(RoomType: RoomType) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'create', RoomType, { headers: this.header, responseType: 'text' })
  }

  removeRoomType(id: string) {
    this.setHeader()
    return this.http.delete(this.Root_URL + id, { headers: this.header, responseType: 'text' })
  }

  updateRoomType(RoomType: RoomType) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'edit', RoomType, { headers: this.header, responseType: 'text' })
  }
}
