import { Router } from '@angular/router';
import { RoomType } from './../../../model/room-type.model';
import { DialogResultComponent } from './../../../dialog/dialog-result/dialog-result.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { RoomTypeService } from './../../../data/room-type.service';
import { RoomService } from './../../../data/room.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-room',
  templateUrl: './add-room.component.html',
})
export class AddRoomComponent implements OnInit {
  frmRoom: FormGroup
  listType: RoomType[]

  constructor(
    private readonly roomService: RoomService,
    private readonly roomTypeSV: RoomTypeService,
    private readonly dialog: NbDialogService,
    private readonly toast: NbToastrService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.frmRoom = this.roomService.formAddRoom;
    this.roomTypeSV.List
      .subscribe(res => {
        this.listType = res
      },
        err => {
          this.dialog.open(DialogResultComponent, {
            context: {
              title: 'THẤT BẠI',
              content: 'Không thể load loại phòng \n' + err.error
            }
          })
        })
  }

  addRoom() {
    this.roomService.addRoom({
      id: this.frmRoom.get('id').value,
      name: this.frmRoom.get('name').value,
      typeID: this.frmRoom.get('type').value,
      adult: this.frmRoom.get('adult').value,
      child: this.frmRoom.get('child').value,
      price: this.frmRoom.get('price').value,
      description: this.frmRoom.get('description').value
    }).subscribe(
      res => {
        this.toast.show('Thêm phòng thành công', 'THÀNH CÔNG', { status: 'success' })
        this.router.navigateByUrl('/room/details/' + this.frmRoom.get('id').value)
      },
      err => {
        this.dialog.open(DialogResultComponent, {
          context: {
            title: 'THẤT BẠI',
            content: err.error
          }
        })
      }
    )
  }

  getConfig(ctrl: string): boolean {
    return this.frmRoom.get(ctrl).invalid && this.frmRoom.get(ctrl).touched
  }
}