import { CustomerService } from './../../../data/customer.service';
import { routes } from './../../../auth/auth-routing.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService, NbDateService } from '@nebular/theme';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RoomService } from './../../../data/room.service';
import { BookingService } from './../../../data/booking.service';
import { Booking } from './../../../model/booking.model';
import { Component, OnInit } from '@angular/core';
import { Room } from '../../../model/room.model';
import { Customer } from '../../../model/customer.model';
import { DialogResultComponent } from '../../../dialog/dialog-result/dialog-result.component';

@Component({
  selector: 'ngx-add-booking',
  templateUrl: './add-booking.component.html',
})
export class AddBookingComponent implements OnInit {
  booking: Booking;
  isAdd = true;
  rooms: Room[];
  customers: Customer[];
  form: FormGroup;

  constructor(
    private bookingService: BookingService,
    private roomService: RoomService,
    private customerService: CustomerService,
    private dateService: NbDateService<Date>,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NbToastrService,
    private dialog: NbDialogService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadData()
    this.route.params.subscribe((params: Params) => {
      if(params['id'] != null) {
        this.bookingService.SelectBooking(params['id']).subscribe(res => {
          this.booking = res;
          this.isAdd = false;
          this.customerService.getByID(this.booking.customerID).subscribe(res => {
            this.customers.push(res)
          })
          this.loadValue()
        })
      }
    })
  }

  loadData(){
    this.roomService.ListRooms.subscribe(res => {
      this.rooms = res
    })
    this.bookingService.ListCustomerAvailable.subscribe(res => {
      this.customers = res;
    })
    this.initForm()
  }

  initForm() {
    this.form = this.fb.group({
      room: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      checkin: [new Date(), [Validators.required]],
      checkout: [this.dateService.addDay(new Date(), 1), [Validators.required]],
      adult: [0, [Validators.required, Validators.min(1)]],
      child: [0, [Validators.min(0)]],
      voucher: ['']
    })
  }

  loadValue() {
    this.form.get('room').setValue(this.booking.roomID)
    this.form.get('customer').setValue(this.booking.customerID)
    this.form.get('checkin').setValue(new Date(this.booking.checkinDate))
    this.form.get('checkout').setValue(new Date(this.booking.checkoutDate))
    this.form.get('adult').setValue(this.booking.adult)
    this.form.get('child').setValue(this.booking.child)
    this.form.get('voucher').setValue(this.booking.voucherCode)
  }

  getFormData() {
    this.booking.roomID = this.getValue('room'),
    this.booking.customerID = this.getValue('customer'),
    this.booking.adult = this.getValue('adult'),
    this.booking.child = this.getValue('child'),
    this.booking.checkinDate = new Date(this.getValue('checkin')),
    this.booking.checkoutDate = new Date(this.getValue('checkout')),
    this.booking.voucherCode = this.getValue('voucher')
  }

  submitForm() {
    console.log(this.isAdd)
    if(this.isAdd) this.addNew()
    else this.update()
  }

  get minCheckout() {
    return this.dateService.addDay(this.getValue('checkin'),1)
  }

  get maxCheckout() {
    return this.dateService.addMonth(this.getValue('checkin'),1)
  }

  get minCheckin() {
    if(this.isAdd) return new Date();
    if(new Date(this.booking.checkinDate) < new Date()){
      return new Date(this.booking.checkinDate)
    } else return new Date();
  }

  get maxCheckin() {
    return this.dateService.addMonth(new Date(), 1)
  }

  addNew() {
    console.log('add')
    this.booking = {
      roomID: this.getValue('room'),
      customerID: this.getValue('customer'),
      adult: this.getValue('adult'),
      child: this.getValue('child'),
      checkinDate: new Date(this.getValue('checkin')),
      checkoutDate: new Date(this.getValue('checkout')),
      voucherCode: this.getValue('voucher')
    }
    this.bookingService.NewBooking(this.booking).subscribe(res => {
      this.toast.show('Create', 'Create booking successful', {status:'success'})
      this.router.navigateByUrl('/home/booking')
    },
    err => {
      this.dialog.open(DialogResultComponent, {
        context: {
          title: 'Error when create booking!!!',
          content: err.error
        }
      })
    })
  }

  update() {
    this.getFormData()
    this.bookingService.EditBooking(this.booking).subscribe(res => {
      this.toast.show('Edit', 'Edit booking successful', {status:'success'})
      this.router.navigateByUrl('/home/booking/details/' + this.booking.id)
    },
    err => {
      this.dialog.open(DialogResultComponent, {
        context: {
          title: 'Error when edit booking!!!',
          content: err.error
        }
      })
    })
  }

  getValue(ctrl: string) {
    return this.form.get(ctrl).value
  }
  getConfig(ctrl: string):boolean {
    return this.form.get(ctrl).invalid && this.form.get(ctrl).touched
  }

  resetFrm() {
    if(this.isAdd) this.initForm()
    else this.loadValue()
  }
}
