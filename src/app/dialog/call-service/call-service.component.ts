import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { BookingService } from './../../data/booking.service';
import { ServiceService } from './../../data/service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Service } from '../../model/service.model';

@Component({
  selector: 'ngx-call-service',
  templateUrl: './call-service.component.html',
})
export class CallServiceComponent implements OnInit {
  addService: Service[] = []
  removeService: Service[] = []
  billService: string[]
  @Input() id: number
  constructor(
    private serviceService: ServiceService,
    private bookingService: BookingService,
    protected ref: NbDialogRef<CallServiceComponent>,
    private toast: NbToastrService
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.bookingService.ServicesOfBill(this.id).subscribe(res => {
      this.billService = res
      this.serviceService.List.subscribe(res => {
        this.addService = []
        this.removeService = []
        res.forEach(value => {
          if (this.billService.includes(value.id)) this.removeService.push(value)
          else this.addService.push(value)
        })
      })
    })
  }

  AddService(service: string) {
    this.bookingService.AddSV(this.id, service).subscribe(res => {
      this.toast.show(`Thêm dịch vụ ${service} thành công`, 'THÊM', { status: 'success' })
      this.loadData()
    }, err => {
      this.toast.show(`Thêm dịch vụ ${service} thất bại ${err.error}`, 'THÊM', { status: 'danger' })
    })
  }

  RemoveService(service: string) {
    this.bookingService.RemoveSV(this.id, service).subscribe(res => {
      this.toast.show(`Xóa dịch vụ ${service} thành công`, 'XÓA', { status: 'success' })
      this.loadData()
    }, err => {
      this.toast.show(`Xóa dịch vụ ${service} thất bại ${err.error}`, 'XÓA', { status: 'danger' })
    })
  }
}
