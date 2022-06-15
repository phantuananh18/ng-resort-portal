import { DialogResultComponent } from './../../../dialog/dialog-result/dialog-result.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { SupplyService } from './../../../data/supply.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-add-supply',
  templateUrl: './add-supply.component.html',
})
export class AddSupplyComponent implements OnInit {
  form: FormGroup;
  constructor(
    private readonly supplyService:SupplyService,
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly dialog: NbDialogService,
    private readonly toast: NbToastrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(10),
        Validators.pattern('^[0-9A-Z]{2,10}$')
      ]],
      name: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      total: ['', [
        Validators.required,
        Validators.min(1)
      ]]
    })
  }

  addSupply() {
    this.supplyService.addSupply({
      id : this.form.get('id').value,
      name : this.form.get('name').value,
      total : this.form.get('total').value
    }).subscribe(
      res => {
        this.toast.show('Create success', 'ADD', {status:'success'})
        this.router.navigateByUrl('/home/supply/details/' + this.form.get('id').value)
      },
      err => {
        this.dialog.open(DialogResultComponent, {
          context: {
            title: 'Error when create',
            content: err.error
          }
        })
      }
    )
  }

  getConfig(ctrl: string):boolean {
    return this.form.get(ctrl).invalid && this.form.get(ctrl).touched
  }
}
