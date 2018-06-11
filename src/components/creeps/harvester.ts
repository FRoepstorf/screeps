import { Config } from "../../utils/Config";
import { CreepAction, CreepActionInterface } from "./creepAction";

export interface HarvesterInterface {
  isBagFull(): boolean;
  tryHarvest(): number;
  moveToHarvest(): void;
  tryEnergyDropOff(): number;
  moveToDropEnergy(): void;
}

export class Harvester implements HarvesterInterface {
  private creepAction: CreepAction;
  private targetSource: Source;
  private targetEnergyDropOff: StructureSpawn | Structure;

  constructor(creepAction: CreepAction) {
    this.creepAction = creepAction;
    this.targetSource = <Source>(
      Game.getObjectById(this.creepAction.getCreep().memory.target_source_id)
    );
    this.targetEnergyDropOff = <StructureSpawn | Structure>(
      Game.getObjectById(
        this.creepAction.getCreep().memory.target_enegery_dropoff
      )
    );
  }
}
