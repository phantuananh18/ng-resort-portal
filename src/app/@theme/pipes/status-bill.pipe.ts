import { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({
    name: 'status'
})
export class StatusBillPipe implements PipeTransform {
    transform(status: string) {
        switch (status) {
            case 'checkin': return "Check In";
            case 'checkout': return "Check Out";
            case 'confirm': return "Đã xác nhận";
            case 'cancel': return "Cancel";
            case 'payment': return "Đã thanh toán";
            default: return "Chờ xác nhận";
        }
    }

}