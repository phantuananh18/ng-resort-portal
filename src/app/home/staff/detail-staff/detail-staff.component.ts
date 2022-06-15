import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Staff } from './../../../model/staff.model';
import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../data/staff.service';
import { pluck, switchMap, filter } from 'rxjs/operators';
import { DialogResultComponent } from '../../../dialog/dialog-result/dialog-result.component';

@Component({
  selector: 'ngx-detail-staff',
  templateUrl: './detail-staff.component.html',
})
export class DetailStaffComponent implements OnInit {
  staff: Staff;
  constructor(
    private route: ActivatedRoute, 
    private staffService: StaffService,
    private dialog: NbDialogService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      this.staffService.getByID(id)
      .subscribe((res:any) => {
        this.staff = res.staff
      })
    })
  }

  onRemove(id: string) {
    this.dialog.open(DialogResultComponent, {
      context: {
        title: `Are you want to remove staff?`,
        content: `ID: ${id}`
      }
    }).onClose.subscribe(result => {
      if(result) {
        this.staffService.removeStaff(id)
        .subscribe(
          res => { this.router.navigateByUrl('/home/staff')},
          err => {
            this.dialog.open(DialogResultComponent, {
              context: {
                title: 'Error remove',
                content: err.error
              }
            })
          }
        )
      }
    })
  }
 
  onUpdate(id: string) {
    this.router.navigateByUrl("/home/staff/update/" + id)
  }
}
