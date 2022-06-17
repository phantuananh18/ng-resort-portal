import { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({
  name: 'status'
})
export class StatusRomPipe implements PipeTransform {
  transform(status: string) {
    switch (status) {
      case 'checkin': return "Còn phòng";
      case 'checkout': return "Hết phòng";
      case 'confirm': return "Đã nhận phòng";
      case 'cancel': return "Cancel";
      case 'payment': return "Đã thanh toán";
      default: return "Chờ nhận phòng";
    }
  }

}