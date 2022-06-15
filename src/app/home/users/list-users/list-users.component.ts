import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerService } from '../../../data/customer.service';
import { DialogResultComponent } from '../../../dialog/dialog-result/dialog-result.component';

@Component({
  selector: 'ngx-list-users',
  templateUrl: './list-users.component.html'
})
export class ListUsersComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string',
        filter: true
      },
      name: {
        title: 'Tên khách hàng',
        type: 'string',
        filter: true
      },
      birth: {
        title: 'Ngày sinh',
        type: 'date',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);
          var format = new DatePipe('en-EN').transform(raw, 'dd/MM/yyyy');
          return format;
        },
        filter: true
      },
      phone: {
        title: 'SDT',
        type: 'string',
        filter: true
      },
      gender: {
        title: 'Giới tính',
        type: 'boolean',
        valuePrepareFunction: (gender) => {
          return gender ? "Nam" : "Nữ"
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Chọn',
            list: [
              { value: true, title: 'Nam' },
              { value: false, title: 'Nữ' },
            ],
          }
        }
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: true
      }
    }
  }
  source: LocalDataSource = new LocalDataSource()
  constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router,
    private readonly dialog: NbDialogService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadSrc()
    this.route.queryParams.subscribe(params => {
      if (params.search != null) { this.onSearch(params.search) }
    })
  }

  loadSrc() {
    this.source.reset()
    this.customerService.ListCustomer
      .subscribe(res => {
        this.source.load(res)
      })
  }

  customerSelect(row: any) {
    this.router.navigateByUrl('/home/user/details/' + row.data.id)
  }

  onDeleteConfirm(event): void {
    this.dialog.open(DialogResultComponent, {
      context: {
        title: 'Are you want to remove this customer?',
        content: `Customer ${event.data?.id}`
      }
    }).onClose.subscribe(result => {
      if (result) {
        //this.customerService.removeCustomer(event.data.id)
        event.confirm.resolve();
      }
      else event.confirm.reject()
    })
  }

  onSearch(query) {
    query = query.trim()
    this.source.setFilter([
      {
        field: 'id',
        search: query
      },
    ], false)
  }
}
