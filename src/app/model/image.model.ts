import { Room } from './room.model';
export interface Image {
    url: string;
    roomID: string;
    Room?: Room;
}