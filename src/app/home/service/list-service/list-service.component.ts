import { ServiceService } from './../../../data/service.service';
import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-list-service',
  templateUrl: './list-service.component.html',
})
export class ListServiceComponent implements OnInit {
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
        title: 'Tên dịch vụ',
        type: 'string',
        filter: true
      },
      price: {
        title: 'Giá',
        type: 'number',
        filter: true,
        valuePrepareFunction: (data) => {
          return data + ' $'
        }
      }
    }
  }
  source: LocalDataSource = new LocalDataSource()
  constructor(
    private svService: ServiceService,
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
    this.svService.List.subscribe(src => {
      this.source.load(src);
    })
  }

  rowSelect(row: any):void {
    this.router.navigateByUrl('/home/service/details/' + row.data.id)
  }

  onSearch(query: string = ''){
    query.trim()
    this.source.setFilter([
      {
        field: 'id',
        search: query
      },
    ], false)
  }
}
