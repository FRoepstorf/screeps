import { CreepManager } from "./components/creeps/creepManager";
import { RoomManager } from "./components/rooms/roomManager";
import { SourcesManager } from "./components/sources/sourcesManager";
import { SpawnManager } from "./components/spawns/spawnManager";
import { MemoryManager } from "./shared/memoryManager";

export class GameManager {
  private memoryManager: MemoryManager;
  private roomManager: RoomManager;
  private sourcesManager: SourcesManager;
  private spawnManager: SpawnManager;
  private creepManager: CreepManager;

  constructor(
    memoryManager: MemoryManager,
    roomManager: RoomManager,
    sourcesManager: SourcesManager,
    spawnManager: SpawnManager,
    creepManager: CreepManager
  ) {
    this.memoryManager = memoryManager;
    this.roomManager = roomManager;
    this.sourcesManager = sourcesManager;
    this.spawnManager = spawnManager;
    this.creepManager = creepManager;
  }

  public run() {
    if (!this.creepManager.isAtMaxHarvesters()) {
      console.log("go");
      this.creepManager.createHarvester();
    }
    if (this.creepManager.isAtMaxHarvesters()) {
      this.creepManager.createUpgrader();
    }
    this.creepManager.upgradersGoToWork();
    this.creepManager.harvestersGoToWork();
  }
}
