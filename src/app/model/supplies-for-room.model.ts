import { Room } from "./room.model";
import { Supply } from "./supply.model";

export interface SuppliesForRoom {
    roomID: string;
    supplyID: string;
    count: number;
    room?: Room;
    supply?: Supply;
}