import { LocalDataSource } from 'ng2-smart-table';
import { DistributionComponent } from './../../../dialog/distribution/distribution.component';
import { SupplyService } from './../../../data/supply.service';
import { Supply } from './../../../model/supply.model';
import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-distribution-supply',
  templateUrl: './distribution-supply.component.html',
})
export class DistributionSupplyComponent implements OnInit {
  settings = {
    actions:{
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      roomID: {
        title: 'Room ID',
        type: 'string',
        filter: true
      },
      room: {
        title: 'Room name',
        type: 'string',
        valuePrepareFunction: (data) => {
          return data.name
        }
      },
      count: {
        title: 'Số lượng',
        type: 'number',
        filter: true
      },
    }
  }
  source: LocalDataSource = new LocalDataSource()
  supply: Supply
  constructor(
    private route: ActivatedRoute,
    private dialog: NbDialogService,
    private supplyService: SupplyService
  ) { }

  ngOnInit(): void {
    this.loadSP()
  }

  loadSP() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.supplyService.getByID(id).subscribe(res => {
        this.supply = res
        this.source.reset()
        this.source.load(this.supply.rooms)
      })
    })
  }

  openDialog() {
    this.dialog.open(DistributionComponent, {
      context: {
        supply: this.supply,
        isAdd: true
      }
    }).onClose.subscribe(
      res => { if(res) this.loadSP() }
    )
  }
  onDeleteConfirm(event) {
    console.log(event.data)
    this.dialog.open(DistributionComponent, {
      context:{
        supply: this.supply,
        roomID: event.data.roomID,
        isAdd: false
      }
    }).onClose.subscribe(
      res => { if(res) this.loadSP() }
    )
  }
}
