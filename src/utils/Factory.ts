import { CreepAction } from "components/creeps/creepAction";
import { GameManager } from "gameManager";
import {ControllerManager} from "../components/controllers/controllerManager";
import { CreepManager } from "../components/creeps/creepManager";
import { RoomManager } from "../components/rooms/roomManager";
import { SourcesManager } from "../components/sources/sourcesManager";
import { SpawnManager } from "../components/spawns/spawnManager";
import { MemoryManager } from "../shared/memoryManager";

export class Factory {
  private roomManager: RoomManager;
  private spawnManager: SpawnManager;
  private sourcesManager: SourcesManager;
  private creepAction: CreepAction;
  private creepManager: CreepManager;
  private memoryManager: MemoryManager;

  constructor() {
    this.roomManager = new RoomManager();
    this.spawnManager = new SpawnManager();
    this.sourcesManager = new SourcesManager(this.roomManager, this.sources());
    this.creepAction = new CreepAction(this.spawnManager.getFirstSpawn());
    this.creepManager = new CreepManager(
      this.sourcesManager,
      this.spawnManager,
      this.createControllerManager()
    );
    this.memoryManager = new MemoryManager();
  }

  public createGameManager(): GameManager {
    return new GameManager(
      this.memoryManager,
      this.roomManager,
      this.sourcesManager,
      this.spawnManager,
      this.creepManager
    );
  }

  private createControllerManager(): ControllerManager {
    return new ControllerManager(this.roomManager.getFirstRoom().controller);
  }

  private sources(): Source[] {
    return this.roomManager.getFirstRoom().find(FIND_SOURCES_ACTIVE);
  }
}
