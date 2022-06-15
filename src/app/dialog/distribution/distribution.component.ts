import { DistributionService } from './../../data/distribution.service';
import { Supply } from './../../model/supply.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { RoomService } from './../../data/room.service';
import { SupplyService } from './../../data/supply.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../model/room.model';

@Component({
  selector: 'ngx-distribution',
  templateUrl: './distribution.component.html',
})
export class DistributionComponent implements OnInit {
  @Input() supply: Supply;
  @Input() roomID!: string;
  @Input() isAdd?: boolean = true;
  listRoom: Room[]
  formDistribute: FormGroup
  constructor(
    private roomService: RoomService,
    private distribution: DistributionService,
    private fb: FormBuilder,
    protected ref: NbDialogRef<DistributionComponent>,
    private toast: NbToastrService
  ) { }

  ngOnInit(): void {
    this.roomService.ListRooms.subscribe(
      res => this.listRoom = res
    )
    this.formDistribute = this.fb.group({
      roomID: [{
        value: this.roomID,
        disabled: !this.isAdd
      }, [Validators.required]],
      count: [0,[
        Validators.required,
        Validators.min(1),
        Validators.max(this.supply.total)
      ]]
    })
    if(this.roomID != null) {
      this.formDistribute.get('roomID').setValue(this.roomID)
      this.formDistribute.get('roomID').disable
    }
  }

  getConfig(ctrl: string):boolean {
    return this.formDistribute.get(ctrl).invalid && this.formDistribute.get(ctrl).touched
  }

  submit() {
    if(this.isAdd) this.GiveSP()
    else this.removeSP()
  }

  GiveSP() {
    this.distribution.GiveSp({
      roomID: this.formDistribute.get('roomID').value,
      supplyID: this.supply.id,
      count: this.formDistribute.get('count').value
    }).subscribe(
      res => {
        this.toast.show('Distribution success', 'SUCCESS', {status:'success'})
        this.ref.close(true)
      },
      err => {
        this.toast.show(err.error, 'ERROR', {status:'danger'})
      }
    )
  }

  removeSP() {
    this.distribution.RemoveSP({
      roomID: this.roomID,
      supplyID: this.supply.id,
      count: this.formDistribute.get('count').value
    }).subscribe(
      res => {
        this.toast.show('Remove success', 'REMOVE', {status:'success'})
        this.ref.close(true)
      },
      err => {
        this.toast.show(err.error, 'REMOVE ERROR', {status:'danger'})
      }
    )
  }

  cancel() {
    this.ref.close()
  }
}
