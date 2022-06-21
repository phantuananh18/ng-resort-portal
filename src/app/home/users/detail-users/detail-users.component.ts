import { NbAuthService } from '@nebular/auth';
import { CustomerService } from '../../../data/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../../../model/customer.model';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { filter, pluck, switchMap } from 'rxjs/operators';
import { DialogResultComponent } from '../../../dialog/dialog-result/dialog-result.component';

@Component({
  selector: 'ngx-detail-users',
  templateUrl: './detail-users.component.html',
})
export class DetailUsersComponent implements OnInit {
  customer: Customer;
  canUpdate: boolean
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private dialog: NbDialogService,
    private router: Router,
    private toast: NbToastrService,
    private authService: NbAuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.customerService.getByID(id)
        .subscribe(res => this.customer = res)
    })
    this.authService.getToken().subscribe(
      token => {
        this.canUpdate = token.getPayload().role == 'ADMIN' || token.getPayload().role == 'MANAGER'
      }
    )
  }

  onRemove() {
    this.dialog.open(DialogResultComponent, {
      context: {
        title: `Bạn có muốn xóa khách hàng này ?`,
        content: `Mã khách hàng: ${this.customer.id}`
      }
    }).onClose.subscribe(result => {
      if (result) {
        this.customerService.deleteCustomer(this.customer.id).subscribe(
          res => {
            this.toast.show('Xóa khách hàng thành công', 'THÀNH CÔNG', { status: 'success' })
            this.router.navigateByUrl("/home/user")
          },
          err => {
            this.dialog.open(DialogResultComponent, {
              context: {
                title: 'THẤT BẠI',
                content: 'Xóa khách hàng không thành công' + err.error
              }
            })
          }
        )
      }
    })
  }

  onUpdate() {
    this.router.navigateByUrl("/home/user/update/" + this.customer.id)
  }

}
