import { SourcesManager } from '../components/sources/sourcesManager';
import { RoomManager } from '../components/rooms/roomManager';
import { SpawnManager } from '../components/spawns/spawnManager';
import { CreepManager } from '../components/creeps/creepManager';
import { CreepAction } from 'components/creeps/creepAction';

export class Factory {
  private roomManager: RoomManager;
  private spawnManager: SpawnManager;
  private sourcesManager: SourcesManager;
  private creepAction: CreepAction;
  private creepManager: CreepManager;

  constructor() {
    this.roomManager = new RoomManager();
    this.spawnManager = new SpawnManager();
    this.sourcesManager = new SourcesManager(this.roomManager, this.sources());
    this.creepAction = new CreepAction(this.spawnManager.getFirstSpawn());
    this.creepManager = new CreepManager(
      this.sourcesManager,
      this.spawnManager,
      this.creepAction
    );
  }

  public getCreepAction(): CreepAction {
    return this.creepAction;
  }

  public getCreepManager(): CreepManager {
    return this.creepManager;
  }

  public createRoomManager(): RoomManager {
    return this.roomManager;
  }

  public getSourcesManager(): SourcesManager {
    return this.sourcesManager;
  }

  public getSpawnManager(): SpawnManager {
    return this.spawnManager;
  }

  private sources(): Source[] {
    return this.roomManager.getFirstRoom().find(FIND_SOURCES_ACTIVE);
  }
}
