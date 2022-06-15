import { Image } from './image.model';
import { RoomType } from './room-type.model';
export interface Room {
    id: string;
    name: string;
    typeID: string;
    adult: number;
    child: number;
    price: number;
    description: string;
    type?: RoomType,
    images?: Image[]
}