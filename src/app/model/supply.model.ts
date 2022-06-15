import { Room } from './room.model';
export interface Supply {
    id: string,
    name: string,
    total: number
    rooms?: [Room]
}