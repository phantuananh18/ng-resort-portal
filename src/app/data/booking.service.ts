import { NbAuthService } from '@nebular/auth';
import { HttpHeaders } from '@angular/common/http';
import { Customer } from './../model/customer.model';
import { Booking } from './../model/booking.model';
import { HttpClient } from '@angular/common/http';
import { BaseEndpoint } from './base-endpoint.api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseEndpoint{
  header: HttpHeaders;
  constructor(private http: HttpClient, private authService: NbAuthService) { 
    super('Booking')
  }

  setHeader() {
    this.authService.onTokenChange().subscribe(
      token => {
          this.header = new HttpHeaders().set("Authorization", "Bearer " + token.getValue());
      })
  }

  get ListBooking() {
    this.setHeader()
    return this.http.get<Booking[]>(this.Root_URL, { headers: this.header})
  }

  SelectBooking(id:number) {
    this.setHeader()
    return this.http.get<Booking>(this.Root_URL + id, { headers: this.header})
  }

  NewBooking(booking: Booking) {
    this.setHeader()
    booking.voucherCode = booking.voucherCode.trim().toUpperCase()
    return this.http.post(this.Root_URL + 'create', booking, { headers: this.header, responseType: 'text'})
  }

  EditBooking(booking: Booking) {
    this.setHeader()
    booking.voucherCode = booking.voucherCode.trim().toUpperCase()
    return this.http.post(this.Root_URL + 'edit', booking, { headers: this.header, responseType: 'text'})
  }

  DeleteBooking(id: number) {
    this.setHeader()
    return this.http.delete(this.Root_URL + id, { headers: this.header, responseType: 'text' })
  }

  CheckBooking(id: number, stt: string) {
    this.setHeader()
    return this.http.post(this.Root_URL + `check/${id}?status=${stt}`,null, { headers: this.header, responseType: 'text'})
  }

  AddSV(bill: number, service: string) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'add-sv', { bookingID: bill, serviceID: service}, { headers: this.header, responseType: 'text'})
  }

  RemoveSV(bill: number, service: string) {
    this.setHeader()
    return this.http.post(this.Root_URL + 'remove-sv', { bookingID: bill, serviceID: service}, { headers: this.header, responseType: 'text'})
  }

  get ListCustomerAvailable() {
    this.setHeader()
    return this.http.get<Customer[]>(this.Root_URL + 'customer', { headers: this.header})
  }

  ServicesOfBill(id: number) {
    this.setHeader()
    return this.http.get<string[]>(this.Root_URL + 'service/' + id, { headers: this.header})
  }
}
