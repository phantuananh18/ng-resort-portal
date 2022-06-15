import { NbDialogService, NbToastrService } from '@nebular/theme';
import { RoomType } from './../../../model/room-type.model';
import { RoomTypeService } from './../../../data/room-type.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Room } from './../../../model/room.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, switchMap, filter } from 'rxjs/operators';
import { RoomService } from '../../../data/room.service';
import { DialogResultComponent } from '../../../dialog/dialog-result/dialog-result.component';

@Component({
  selector: 'ngx-edit-room',
  templateUrl: './edit-room.component.html',
})
export class EditRoomComponent implements OnInit {
  id: string;
  room: Room;
  formEdit: FormGroup;
  listType: RoomType[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly roomService: RoomService,
    private readonly roomTypeSV: RoomTypeService,
    private readonly dialog: NbDialogService,
    private readonly router: Router,
    private readonly toast: NbToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.roomService.SelectRoom(this.id).subscribe(res => this.room = res)
      this.initFrm()
    })
    this.roomTypeSV.List
    .subscribe(res => {
        this.listType = res
      },
      err => {
        this.dialog.open(DialogResultComponent, {
          context: {
            title: 'Error',
            content: 'Can not load list room type \n' + err.error
          }
        })
      })
  }

  initFrm() {
    this.formEdit = this.roomService.getFormUpdate(this.id);
  }

  getConfig(ctrl: string):boolean {
    return this.formEdit.get(ctrl).invalid && this.formEdit.get(ctrl).touched
  }

  UpdateRoom() {
    this.roomService.updateRoom({
      id: this.id,
      name: this.formEdit.get('name').value,
      description: this.formEdit.get('description').value,
      typeID: this.formEdit.get('type').value,
      adult: this.formEdit.get('adult').value,
      child: this.formEdit.get('child').value,
      price: this.formEdit.get('price').value
    })
    .subscribe(
      res => {
        console.log(res)
        this.toast.show('Edit room success', 'EDIT ROOM', {status:'success'})
        this.router.navigateByUrl('/home/room/details/' + this.id)
      },
      err => {
        console.log(err)
        this.dialog.open(DialogResultComponent, {
          context: {
            title: 'Error when update',
            content: err.error
          }
        })
      }
    )
  }
}
