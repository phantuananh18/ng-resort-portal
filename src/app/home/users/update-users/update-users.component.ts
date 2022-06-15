import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../data/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Customer } from '../../../model/customer.model';
import { DialogResultComponent } from '../../../dialog/dialog-result/dialog-result.component';

@Component({
  selector: 'ngx-update-users',
  templateUrl: './update-users.component.html',
})
export class UpdateUsersComponent implements OnInit {
  frmUpdateUser: FormGroup;
  user$: Observable<Customer>;
  constructor(
    private readonly fb: FormBuilder, 
    private readonly userService: CustomerService,
    private readonly route: ActivatedRoute,
    private readonly dialog: NbDialogService,
    private readonly router: Router,
    private readonly toast: NbToastrService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(id);
      this.user$ = this.userService.getByID(id);
    })
    this.user$.subscribe(u => {
      this.frmUpdateUser = this.fb.group({
        name: [u.name, [
          Validators.required,
          Validators.maxLength(50)
        ]],
        password: [u.password, [
          Validators.required, 
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern('^[a-z0-9A-Z]{6,20}$')
        ]],
        phone: [u.phone, [
          Validators.required,
          Validators.pattern(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
        ]],
        gender: [u.gender, [Validators.required]],
        birth: [new Date(u.birth), [Validators.required]],
        email: [u.email, [Validators.email]]
      })
    })
  }

  update() {
    this.user$.subscribe(u => {
      u.name = this.frmUpdateUser.get('name').value;
      u.birth = this.frmUpdateUser.get('birth').value;
      u.password = this.frmUpdateUser.get('password').value;
      u.phone = this.frmUpdateUser.get('phone').value;
      u.gender = this.frmUpdateUser.get('gender').value;
      u.email = this.frmUpdateUser.get('email').value;
      this.userService.updateCustomer(u)
      .subscribe(
        res => {
          this.toast.show('Update complete', 'UPDATE', {status: 'success'})
          this.router.navigateByUrl('/home/user/details/' + u.id)
        },
        err => {
          this.toast.show(err.error, 'Error update', {status: 'danger'})
        }
      )
    })
  }

  updateUser(){
    this.user$.subscribe((u) => {
      this.dialog.open(DialogResultComponent,{
        context: {
          title: `Cập nhật khách hàng ${u.id}?`
        }
      }).onClose.subscribe(result => {
        if(result) {
          this.update();
        }
      })
    });
  }

  resetForm() {
    this.user$.subscribe(u => {
      this.frmUpdateUser.get('name').setValue(u.name);
      this.frmUpdateUser.get('birth').setValue(u.birth);
      this.frmUpdateUser.get('password').setValue(u.password);
      this.frmUpdateUser.get('phone').setValue(u.phone);
      this.frmUpdateUser.get('gender').setValue(u.gender);
      this.frmUpdateUser.get('email').setValue(u.email)
    })
  }

  getConfig(ctrl: string) {
    return this.frmUpdateUser.get(ctrl).invalid && this.frmUpdateUser.get(ctrl).touched
  }
}
