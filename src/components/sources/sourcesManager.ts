import { RoomManager } from "../rooms/roomManager";

export class SourcesManager {
  private sources: Source[];
  private sourceCount: number;
  private roomManager: RoomManager;

  constructor(roomManager: RoomManager, sources: Source[]) {
    this.roomManager = roomManager;
    this.sources = sources;
    this.sourceCount = _.size(this.sources);
  }

  public getFirstSource(): Source {
    return this.sources[0];
  }
}
