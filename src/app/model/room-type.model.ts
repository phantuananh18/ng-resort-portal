import { Room } from "./room.model";

export interface RoomType {
    id: string;
    nameType: string;
    rooms?: Room[];
}