import { PermissionPipe } from './../../../@theme/pipes/permission.pipe';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { StaffService } from '../../../data/staff.service';
import { DialogResultComponent } from '../../../dialog/dialog-result/dialog-result.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-list-staff',
  templateUrl: './list-staff.component.html'
})
export class ListStaffComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    }, pager: {
      display: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string',
      },
      name: {
        title: 'Tên nhân viên',
        type: 'string',
      },
      birth: {
        title: 'Ngày sinh',
        type: 'date',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);
          var format = new DatePipe('en-EN').transform(raw, 'dd/MM/yyyy');
          return format;
        }
      },
      phone: {
        title: 'SDT',
        type: 'string'
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
      permissionID: {
        title: 'Chức vụ',
        type: 'string',
        valuePrepareFunction: (permission) => {
          return new PermissionPipe().transform(permission)
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Chọn',
            list: [
              { value: 'STAFF', title: 'Nhân viên' },
              { value: 'WAREHOUSE', title: 'Nhân viên kho' },
              { value: 'ADMIN', title: 'Quản trị viên' },
              { value: 'MANAGER', title: 'Quản lý' },
            ],
          }
        }
      }
    }
  }
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private dialog: NbDialogService,
    private staffService: StaffService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NbToastrService
  ) { }

  ngOnInit(): void {
    this.loadSrc()
    this.route.queryParams.subscribe(params => {
      if (params.search != null) { this.onSearch(params.search) }
    })
  }

  loadSrc() {
    this.source.reset()
    this.staffService.ListStaff.subscribe(
      res => { this.source.load(res) }
    )
  }

  staffSelect(row: any) {
    this.router.navigateByUrl('/home/staff/details/' + row.data.id)
  }

  onDeleteConfirm(event): void {
    this.dialog.open(DialogResultComponent, {
      context: {
        title: 'Are you want to remove this staff?',
        content: "Staff " + event.data.id
      }
    }).onClose.subscribe(result => {
      if (result) {
        this.staffService.removeStaff(event.data.id)
          .subscribe(
            res => {
              this.loadSrc()
            },
            err => {
              this.toast.show(err.error, 'Error delete', { status: 'danger' })
            }
          )
      }
      else event.confirm.reject()
    })
  }

  onSearch(query) {
    query.trim()
    this.source.setFilter([
      {
        field: 'id',
        search: query
      },
    ], false)
  }
}
