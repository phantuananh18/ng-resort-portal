import { SupplyService } from './../../../data/supply.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-list-supplies',
  templateUrl: './list-supplies.component.html'
})
export class ListSuppliesComponent implements OnInit {
  settings = {
    actions:{
      add: false,
      edit: false,
      delete:false
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string',
        filter: true
      },
      name: {
        title: 'Tên vật tư',
        type: 'string',
        filter: true
      },
      total: {
        title: 'Số lượng',
        type: 'number',
        filter: true
      },
    }
  }
  source: LocalDataSource = new LocalDataSource()
  constructor(
    private supplyService: SupplyService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loadSrc()
    this.route.queryParams.subscribe(params => {
      if(params.search != null) { this.onSearch(params.search)}
    })
  }

  loadSrc() {
    this.supplyService.List.subscribe(src => {
      this.source.load(src)
    })
  }

  rowSelect(row: any):void {
    this.router.navigateByUrl('/home/supply/details/' + row.data.id)
  }

  onSearch(query){
    query.trim()
    this.source.setFilter([
      {
        field: 'id',
        search: query
      },
    ], false)
  }
}
