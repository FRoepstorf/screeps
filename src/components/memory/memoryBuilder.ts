import {HarvesterMemory} from "./Memories/HarvesterMemory";
import {UpgraderMemory} from "./Memories/UpgraderMemory";

export class MemoryBuilder {
  public static buildHarvesterMemory(creepMemory: CreepMemory) {
    // @ts-ignore
    return new HarvesterMemory(creepMemory.targetSourceId, creepMemory.targetEnergyDropoffId);
  }

  public static buildUpgraderMemory(creepMemory: CreepMemory) {
    // @ts-ignore
    return new UpgraderMemory(creepMemory.controllerId, creepMemory.spawnId);
  }
}
