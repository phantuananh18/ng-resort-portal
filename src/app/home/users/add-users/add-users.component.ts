import { DialogResultComponent } from './../../../dialog/dialog-result/dialog-result.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { CustomerService } from '../../../data/customer.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-add-users',
  templateUrl: './add-users.component.html',
})
export class AddUsersComponent implements OnInit {
  formAddUser: FormGroup;
  constructor(
    private readonly customerService: CustomerService,
    private fb: FormBuilder,
    private readonly router: Router,
    private toast: NbToastrService,
    private dialog: NbDialogService) { }

  ngOnInit(): void {
    this.formAddUser = this.fb.group({
      id: ['', [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^[a-z0-9A-Z]{6,20}$')
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
      email: ['', [Validators.email]]
    })
  }

  addUser() {
    this.customerService.addCustomer({
      id: this.formAddUser.get('id').value,
      name: this.formAddUser.get('name').value,
      birth: this.formAddUser.get('birth').value,
      gender: this.formAddUser.get('gender').value,
      password: this.formAddUser.get('password').value,
      phone: this.formAddUser.get('phone').value,
      email: this.formAddUser.get('email').value
    }).subscribe(
      res => {
        this.toast.show('ADD CUSTOMER', 'Add new success', {status:'success'})
        this.router.navigateByUrl('/home/user')
      },
      err => {
        this.dialog.open(DialogResultComponent,{
          context: {
            title: 'ERROR CREATE!!!',
            content: err.error
          }
        })
      }
    )
  }

  resetForm() {
    this.formAddUser.reset()
  }

  getConfig(ctrl: string) {
    return this.formAddUser.get(ctrl).invalid && this.formAddUser.get(ctrl).touched
  }

}
