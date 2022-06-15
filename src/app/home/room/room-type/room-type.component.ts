import { filter } from 'rxjs/operators';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { RoomTypeService } from './../../../data/room-type.service';
import { RoomType } from './../../../model/room-type.model';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogResultComponent } from '../../../dialog/dialog-result/dialog-result.component';

@Component({
  selector: 'ngx-room-type',
  templateUrl: './room-type.component.html',
})
export class RoomTypeComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'Mã Loại phòng',
        type: 'string',
        filter: false,
        editable: false
      },
      nameType: {
        title: 'Tên loại phòng',
        type: 'string',
        filter: false
      },
      rooms : {
        title: 'Số phòng',
        type: 'number',
        valuePrepareFunction: (data: any[]) => {
          return data.length
        },
        filter: false,
        editable: false,
        addable: false,
      }
    }
  }

  source: LocalDataSource = new LocalDataSource()
  constructor(
    private roomTypeService: RoomTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: NbDialogService,
    private toast: NbToastrService
    ) { }

  ngOnInit(): void {
    this.loadSrc()
    this.route.paramMap.subscribe(params => {
      console.log(params.get('search'))
    })
  }

  loadSrc() {
    this.source.reset()
    this.roomTypeService.List
    .subscribe(res => {
      this.source.load(res)
    })
  }

  onDeleteConfirm(event) {
    this.dialog.open(DialogResultComponent, {
      context: {
        title: `Are you want to remove service?`,
        content: `Room Type id: ${event.data.id}`
      }
    }).onClose.subscribe(result => {
      if(result) {
        this.roomTypeService.removeRoomType(event.data.id)
        .subscribe(
          res => {
            this.loadSrc()
            this.showToast('Delete', 'Delete success', {status: 'success'})
          },
          err => {
            this.toast.show(err.error, 'Error', {status:'danger'})
          }
        )
      }
    })
  }

  onEditConfirm(event) {
    const val = this.validate(false, event.newData)
    if(val.has(false)){
      alert(val.get(false))
    }
    else{
      this.roomTypeService.updateRoomType({id: event.newData.id, nameType: event.newData.nameType })
      .subscribe(
        res => {
          event.confirm.resolve();
          this.loadSrc()
          this.showToast('Edit', 'Edit success', {status: 'success'})
        },
        err => {
          event.confirm.reject();
          this.toast.show('Error', err.error, {status: 'danger'})
        }
      )
    }
  }

  onAddConfirm(event) {
    const val = this.validate(true, event.newData)
    if(val.has(false)) {
      alert(val.get(false))
    }
    else{
      this.roomTypeService.addRoomType(event.newData)
      .subscribe(
        res => {
          event.confirm.resolve();
          this.loadSrc()
          this.showToast('ADD', 'Add success', {status: 'success'})
        },
        err => {
          this.showToast('ADD', err.error, {status: 'danger'})
        }
      )
    }
  }

  validate(isAdd:boolean, model: RoomType): Map<boolean,string> {
    const idLength = model.id.trim().length;
    const nameLength = model.nameType.trim().length;
    const result = new Map<boolean,string>();
    if(isAdd) {
      if(idLength<= 0) return result.set(false,"ID is required");
      else if (idLength >10) return result.set(false, "ID constain at most 10 characters");
      else if (!model.id.match('^[0-9A-Z]{4,10}$')) return result.set(false, 'Type ID is invalid')
    }
    if(nameLength<= 0) return result.set(false,"Name is required");
    else if (nameLength >30) return result.set(false, "Name constain at most 30 characters");
    return result.set(true,'')
  }

  onSearch(query) {
    if(query.trim().length === 0) {
      this.loadSrc()
    }
    else {
      query = query.trim()
      this.source.setFilter([
        {
          field: 'id',
          search: query
        },
      ], false)
    }
  }

  showToast(title: string, content: string, option: any){
    this.toast.show(content, title, option)
  }
}
