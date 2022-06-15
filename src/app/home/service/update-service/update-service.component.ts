import { Service } from './../../../model/service.model';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../data/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { DialogResultComponent } from '../../../dialog/dialog-result/dialog-result.component';

@Component({
  selector: 'ngx-update-service',
  templateUrl: './update-service.component.html',
})
export class UpdateServiceComponent implements OnInit {
  form: FormGroup;
  service$: Observable<Service>;
  constructor(
    private fb: FormBuilder,
    private readonly svService: ServiceService,
    private readonly route: ActivatedRoute,
    private readonly dialog: NbDialogService,
    private readonly router: Router,
    private readonly toast: NbToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.service$ = this.svService.getByID(id);
    })
    this.service$.subscribe(s => {
      this.form = this.fb.group({
        name: [s.name, [
          Validators.required,
          Validators.maxLength(30)
        ]],
        description: [s.description, [
          Validators.required,
        ]],
        price: [s.price, [
          Validators.required,
          Validators.min(1)
        ]]
      })
    })
  }

  updateService() {
    this.service$.subscribe((s) => {
      this.dialog.open(DialogResultComponent,{
        context: {
          title: `Cập nhật dịch vụ ${s.id}?`
        }
      }).onClose.subscribe(result => {
        if(result) {
          this.update();
          this.router.navigateByUrl(`/home/service/details/${s.id}`);
        }
      })
    });
    
  }

  update() {
    this.service$.subscribe(s => {
      s.name = this.form.get('name').value;
      s.description = this.form.get('description').value;
      s.price = this.form.get('price').value;
      this.svService.updateService(s)
      .subscribe(
        res => {
          this.toast.show('Edit success', 'EDIT', { status: 'success'})
          this.router.navigateByUrl('/home/service/details/' + s.id)
        },
        err => {
          this.dialog.open(DialogResultComponent, {
            context: {
              title: 'ERROR',
              content: err.error
            }
          })
        }
      );
    })
  }

  resetForm() {
    this.service$.subscribe(s => {
      this.form.get('name').setValue(s.name)
      this.form.get('price').setValue(s.price)
      this.form.get('description').setValue(s.description)
    })
  }

  getConfig(ctrl: string):boolean {
    return this.form.get(ctrl).invalid && this.form.get(ctrl).touched
  }
}
