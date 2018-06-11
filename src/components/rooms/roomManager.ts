import { Config } from '../../utils/Config';

export class RoomManager {
  private rooms: { [roomName: string]: Room };
  private roomNames: string[] = [];

  constructor() {
    this.rooms = Game.rooms;
    this.initializeRoomNames();
  }

  private initializeRoomNames() {
    for (let roomName in this.rooms) {
      this.roomNames.push(roomName);
    }
  }

  public getFirstRoom(): Room {
    return this.rooms[this.roomNames[0]];
  }
}
