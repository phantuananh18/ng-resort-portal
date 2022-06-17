import { DialogResultComponent } from './../../../dialog/dialog-result/dialog-result.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { StaffService } from './../../../data/staff.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Staff } from '../../../model/staff.model';

@Component({
  selector: 'ngx-update-staff',
  templateUrl: './update-staff.component.html',
})
export class UpdateStaffComponent implements OnInit {
  frUpdateStaff: FormGroup;
  staff: Staff;
  constructor(
    private fb: FormBuilder,
    private readonly staffService: StaffService,
    private readonly route: ActivatedRoute,
    private readonly dialog: NbDialogService,
    private readonly router: Router,
    private readonly toast: NbToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.staffService.getByID(id)
        .subscribe((res: any) => {
          this.staff = res.staff
          this.initForm()
        })
    })
  }

  initForm() {
    this.frUpdateStaff = this.fb.group({
      name: [this.staff.name, [
        Validators.required,
        Validators.maxLength(50)
      ]],
      password: [this.staff.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^[a-z0-9A-Z]{6,20}$')
      ]],
      phone: [this.staff.phone, [
        Validators.required,
        Validators.pattern(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
      ]],
      gender: [this.staff.gender, [Validators.required]],
      birth: [new Date(this.staff.birth), [Validators.required]],
      permission: [this.staff.permissionID, [Validators.required]],
      email: [this.staff.email, [Validators.email, Validators.required]]
    })
  }

  resetForm() {
    this.initForm()
  }

  updateStaff() {
    this.dialog.open(DialogResultComponent, {
      context: {
        title: 'Bạn có muốn cập nhật nhân viên này không ?',
        content: `Mã nhân viên: ${this.staff.id}`
      }
    }).onClose.subscribe(result => {
      if (result) {
        this.update();
      }
    })
  }

  update() {
    this.staff.name = this.frUpdateStaff.get('name').value
    this.staff.birth = this.frUpdateStaff.get('birth').value
    this.staff.gender = this.frUpdateStaff.get('gender').value
    this.staff.phone = this.frUpdateStaff.get('phone').value
    this.staff.permissionID = this.frUpdateStaff.get('permission').value
    this.staff.email = this.frUpdateStaff.get('email').value
    this.staff.password = this.frUpdateStaff.get('password').value
    this.staffService.updateStaff(this.staff)
      .subscribe(res => {
        this.router.navigateByUrl('/home/staff/details/' + this.staff.id)
      },
        err => {
          this.dialog.open(DialogResultComponent, {
            context: {
              title: 'THẤT BẠI',
              content: 'Cập nhật nhân viên không thành công'
            }
          })
        })
  }
}
