import { DatePipe } from '@angular/common';
import { VoucherService } from './../../../data/voucher.service';
import { Voucher } from './../../../model/voucher.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDateService, NbDialogService, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { DialogResultComponent } from '../../../dialog/dialog-result/dialog-result.component';
import { format } from 'path';

@Component({
  selector: 'ngx-update-voucher',
  templateUrl: './update-voucher.component.html',
})
export class UpdateVoucherComponent implements OnInit {
  form: FormGroup
  voucher: Voucher;
  constructor(
    private readonly voucherService: VoucherService,
    private readonly route: ActivatedRoute,
    private readonly dialog: NbDialogService,
    private readonly toast: NbToastrService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private datePipe: DatePipe,
    private readonly dateService: NbDateService<Date>
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
    this.voucherService.getByID(id)
      .subscribe(res => {
        this.voucher = res
        this.form = this.fb.group({
          fromDate: [new Date(this.voucher.fromDate), [
            Validators.required
          ]],
          toDate: [new Date(this.voucher.toDate), [
            Validators.required
          ]],
          condition: [this.voucher.condition,[
            Validators.required,
            Validators.min(0),
          ]],
          discount:[this.voucher.discount,[
            Validators.required,
            Validators.min(1),
            Validators.max(100)
          ]]
        })
      })
    })
  }
  updateVoucher() {
    this.dialog.open(DialogResultComponent,{
      context: {
        title: `Cập nhật voucher ${this.voucher.code}?`
      }
    }).onClose.subscribe(result => {
      if(result) {
        this.update();
      }
    })
  }

  update() {
      this.voucherService.updateVoucher({
        code: this.voucher.code,
        fromDate: new Date(this.getValueFrm('fromDate')),
        toDate: new Date(this.getValueFrm('toDate')),
        condition: this.getValueFrm('condition'),
        discount: this.getValueFrm('discount')
      }).subscribe(
        res => {
          this.toast.show('Edit success', 'EDIT', { status: 'success'}),
          this.router.navigateByUrl('/home/voucher/details/' + this.voucher.code)
        },
        err => {
          this.dialog.open(DialogResultComponent, {
            context : {
              title: 'ERROR',
              content: err.error
            }
          })
        }
      );
  }

  resetForm() {
    this.setValueFrm('condition',this.voucher.condition),
    this.setValueFrm('discount',this.voucher.discount),
    this.setValueFrm('fromDate',new Date(this.voucher.fromDate)),
    this.setValueFrm('toDate',new Date(this.voucher.toDate))
  }

  getValueFrm(ctrl: string) {
    return this.form.get(ctrl).value
  }

  setValueFrm(ctrl:string, value:any) {
    this.form.get(ctrl).setValue(value)
  }

  getConfig(ctrl: string):boolean {
    return this.form.get(ctrl).invalid && this.form.get(ctrl).touched
  }

  getMinDate() {
    let today = new Date().getTime();
    let fromdate = new Date(this.voucher.fromDate).getTime();
    let min;
    if(fromdate >= today) min = new Date();
    else min = new Date(this.voucher.fromDate)
    return this.dateService.addDay(min,0)
  }
}
