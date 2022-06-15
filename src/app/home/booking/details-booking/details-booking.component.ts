import { DialogResultComponent } from './../../../dialog/dialog-result/dialog-result.component';
import { CallServiceComponent } from './../../../dialog/call-service/call-service.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { BookingService } from './../../../data/booking.service';
import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../model/booking.model';

@Component({
  selector: 'ngx-details-booking',
  templateUrl: './details-booking.component.html'
})
export class DetailsBookingComponent implements OnInit {
  bill: Booking
  constructor(
    private bookingService: BookingService,
    private dialog: NbDialogService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.route.params.subscribe((params: Params) => {
      if(params['id'] != null) {
        this.bookingService.SelectBooking(params['id']).subscribe(res => {
          this.bill = res;
        })
      }
    })
  }

  getPrice() {
    let from = new Date(this.bill.checkinDate).getTime()
    let to = new Date(this.bill.checkoutDate).getTime()
    let price:number = this.bill.room.price * Math.round((to-from)/(1000*3600*24))
    if(this.bill.services.length > 0) {
      this.bill.services.forEach(value => {
        price += value.service.price
      })
    }
    if(this.bill.voucherCode != null) {
      price *= ((100 - this.bill.voucher.discount)/100)
    }
    return Math.round(price)
  }

  CanEdit() {
    return (new Date(this.bill.checkoutDate) >= new Date() && this.bill.status != 'cancel')
  }

  EditBooking() {
    this.router.navigateByUrl('/home/booking/edit/' + this.bill.id)
  }

  RemoveBooking() {
    this.bookingService.DeleteBooking(this.bill.id).subscribe(
      res => {
        this.toastr.show(`Remove bill #${this.bill.id} success`, 'Remove', {status:'success'})
        this.router.navigateByUrl('/home/booking')
      },
      err => {
        this.dialog.open(DialogResultComponent, {
          context: {
            title:'ERROR REMOVE',
            content: err.error
          }
        })
      }
    )
  }

  CheckBooking(status: string) {
    this.bookingService.CheckBooking(this.bill.id, status).subscribe(
      res => {
        this.toastr.show('Confirm success', 'Confirm', {status: 'success'})
        this.loadData()
      },
      err => {
        this.toastr.show('Confirm failed', 'Confirm', {status: 'danger'})
      }
    )
  }

  CallService() {
    this.dialog.open(CallServiceComponent, {
      context: {
        id: this.bill.id
      }
    }).onClose.subscribe(res => {
      this.loadData()
    })
  }

  get isCheckin() {
    return (this.bill.status == 'confirm') && new Date(this.bill.checkinDate) <= new Date()
  }

  get isCheckout() {
    return (this.bill.status == 'checkin') && new Date(this.bill.checkoutDate) <= new Date()
  }
}
