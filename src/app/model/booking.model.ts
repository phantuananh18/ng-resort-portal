import { Voucher } from './voucher.model';
import { Room } from './room.model';
import { Staff } from './staff.model';
import { Customer } from './customer.model';
import { Service } from './service.model';
export interface Booking {
    id?: number,
    customerID: string,
    roomID: string,
    checkinDate: Date,
    checkoutDate: Date,
    status?: string,
    adult: number,
    child: number,
    voucherCode?: string,
    feedBack?: string,
    rate?: number,
    services?: { bookingID: number, serviceID: string, service: Service}[]
    customer?: Customer,
    room?: Room,
    voucher?: Voucher
}