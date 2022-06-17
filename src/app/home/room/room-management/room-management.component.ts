import { RoomType } from './../../../model/room-type.model';
import { RoomTypeService } from './../../../data/room-type.service';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RoomService } from './../../../data/room.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { StatusRomPipe } from '../../../@theme/pipes';
@Component({
  selector: 'ngx-room-management',
  templateUrl: './room-management.component.html',
})
export class RoomManagementComponent implements OnInit {
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
        title: 'Tên phòng',
        type: 'string',
        filter: true
      },
      roomType: {
        title: 'Loại phòng',
        type: 'string',
        valuePrepareFunction: (data: any) => {
          return data.nameType
        },
        filter: true
      },
      adult: {
        title: 'Số lượng người lớn',
        type: 'number',
        filter: true
      },
      child: {
        title: 'Số lượng người nhỏ',
        type: 'number',
        filter: true
      },
      price: {
        title: 'Giá theo ngày',
        type: 'number',
        filter: true,
        valuePrepareFunction: (data: any) => {
          return data + ' $'
        }
      },
      // status: {
      //   title: "Trạng thái",
      //   type: "string",
      //   valuePrepareFunction: (data) => {
      //     return new StatusRomPipe().transform(data);
      //   },
      //   filter: {
      //     type: "list",
      //     config: {
      //       selectText: "Chọn",
      //       list: [
      //         { value: "wait", title: "Chờ nhận phòng" },
      //         { value: "confirm", title: "Đã nhận phòng" },
      //         { value: "payment", title: "Đã thanh toán" },
      //         { value: "cancel", title: "Đã hủy" },
      //         { value: "checkin", title: "Còn phòng" },
      //         { value: "checkout", title: "Hết phòng" },
      //       ],
      //     },
      //   },
      //   filterFunction(cell?: any, search?: string): boolean {
      //     if (
      //       search === "" ||
      //       search === cell ||
      //       (search === "wait" && cell === "")
      //     ) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   },
      // },
    }
  }

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private readonly roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadSrc()
    this.route.queryParams.subscribe(params => {
      if (params.search != null) { this.onSearch(params.search) }
    })
  }

  loadSrc() {
    this.source.reset()
    this.roomService.ListRooms
      .subscribe(res => this.source.load(res))
  }

  selectRoom(room: any): void {
    this.router.navigateByUrl("/home/room/details/" + room.data.id)
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Bạn có muốn xóa không ?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSearch(query: string = '') {
    query.trim()
    this.source.setFilter([
      {
        field: 'id',
        search: query
      },
    ], false)
  }
}
