import { NbDialogRef } from '@nebular/theme';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-dialog-result',
  templateUrl: './dialog-result.component.html',
  styleUrls: ['./dialog-result.component.scss']
})
export class DialogResultComponent {
  @Input() title: string;
  @Input() content: string;
  constructor(protected ref: NbDialogRef<DialogResultComponent>) { }

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.ref.close(true);
  }
}
