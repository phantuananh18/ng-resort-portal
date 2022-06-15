import { logging } from 'protractor';
import { DialogResultComponent } from './../../../dialog/dialog-result/dialog-result.component';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from './../../../data/staff.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-staff',
  templateUrl: './add.component.html',
})
export class AddStaffComponent implements OnInit {
  formAddStaff: FormGroup;
  listRoles = [
    { value: "STAFF", name: "Nhân viên" },
    { value: "ADMIN", name: "Quản lý" },
    { value: "WAREHOUSE", name: "Nhân viên kho" },
    { value: "MANAGER", name: "Quản lý" }
  ]
  constructor(
    private readonly staffService: StaffService,
    private fb: FormBuilder,
    private readonly router: Router,
    private dialog: NbDialogService) { }

  ngOnInit(): void {
    this.formAddStaff = this.fb.group({
      id: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^[a-z0-9A-Z]{5,20}$')
      ]],
      name: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^[a-z0-9A-Z]{6,20}$')
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
      ]],
      gender: [true, [Validators.required]],
      birth: ['', [Validators.required]],
      permission: ['', [Validators.required]],
      email: [null, [
        Validators.email, Validators.required
      ]]
    })
  }

  addStaff() {
    this.staffService.addStaff({
      id: this.formAddStaff.get('id').value,
      name: this.formAddStaff.get('name').value,
      password: this.formAddStaff.get('password').value,
      phone: this.formAddStaff.get('phone').value,
      gender: this.formAddStaff.get('gender').value,
      birth: this.formAddStaff.get('birth').value,
      permissionID: this.formAddStaff.get('permission').value,
      email: this.formAddStaff.get('email').value
    })
      .subscribe(
        res => {
          this.router.navigateByUrl('/home/staff/details/' + this.formAddStaff.get('id').value)
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

  resetForm(event) {
    event.preventDefault();
    this.formAddStaff.reset()
  }

  getConfig(ctrl: string): boolean {
    return this.formAddStaff.get(ctrl).invalid && this.formAddStaff.get(ctrl).touched
  }
}
