import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Room } from './../model/room.model';
import { BaseEndpoint } from './base-endpoint.api';
import { ServerDataSource } from 'ng2-smart-table';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../model/image.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends BaseEndpoint {
  header: HttpHeaders
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: NbAuthService) {
    super('Room');
  }

  setHeader() {
    this.authService.onTokenChange().subscribe(
      token => {
          this.header = new HttpHeaders().set("Authorization", "Bearer " + token.getValue());
      })
  }

  get ListRooms() {
    return this.http.get<Room[]>(this.Root_URL)
  }

  SelectRoom(id: string) {
    return this.http.get<Room>(this.Root_URL + id);
  }

  addRoom(room: Room) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'create', room, { headers: this.header, responseType: 'text' })
  }

  get formAddRoom() {
    return this.fb.group({
      id: [null,[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
        Validators.pattern('^[0-9A-Z]{4,10}$')
      ]],
      name: [null,[
        Validators.required,
        Validators.minLength(4)
      ]],
      type: [null, [
        Validators.required
      ]],
      adult:[0, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]],
      child:[0, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]],
      price:[0, [
        Validators.required,
        Validators.min(1)
      ]],
      description: [ '',
        Validators.required
      ]
    })
  }

  getSelectRoom(id: string) {
    return this.http.get<Room>(this.Root_URL + id)
  }

  getFormUpdate(id: string):FormGroup {
    const form = this.formAddRoom
    this.SelectRoom(id).subscribe(res => {
      form.get('id').setValue(res.id);
      form.get('name').setValue(res.name);
      form.get('type').setValue(res.typeID);
      form.get('adult').setValue(res.adult);
      form.get('child').setValue(res.child);
      form.get('price').setValue(res.price);
      form.get('description').setValue(res.description);
    })
    return form
  }

  updateRoom(room: Room) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'edit_info', room, { headers: this.header, responseType: 'text' })
  }

  deleteRoom(id: string) {
    this.setHeader()
    return this.http.delete(this.Root_URL + id, { headers: this.header, responseType: 'text' })
  }

  getListImg(id: string) {
    return this.http.get<Image[]>(this.Root_URL + `img/${id}`)
  }

  addImage(id: string, url: string) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'add_img', { roomID: id, url: url }, { headers: this.header, responseType: 'text' })
  }

  removeImage(url: string) {
    let params = new HttpParams();
    params = params.append('url', url);
    return this.http.post(this.Root_URL + `remove_img`, null, {params: params, responseType: 'text' })
  }
}
