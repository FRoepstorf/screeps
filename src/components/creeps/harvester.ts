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
  private targetSource: Source;
  private targetEnergyDropOff: StructureSpawn | Structure;
  private creep: Creep;

  constructor(creep: Creep) {
    this.creep = creep;
    this.targetSource = (
      Game.getObjectById(this.creep.memory.target_source_id)
    ) as Source;
    this.targetEnergyDropOff = (
      Game.getObjectById(this.creep.memory.target_energy_dropoff_id)
    ) as StructureSpawn | Structure;
  }

  public isBagFull(): boolean {
    return this.creep.carry.energy === this.creep.carryCapacity;
  }

  public tryHarvest(): number {
    return this.creep.harvest(this.targetSource);
  }

  public moveToHarvest(): void {
    if (this.tryHarvest() === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.targetSource);
    }
  }

  public tryEnergyDropOff(): number {
    console.log(this.targetEnergyDropOff);
    return this.creep.transfer(this.targetEnergyDropOff, RESOURCE_ENERGY);
  }

  public moveToDropEnergy(): void {
    if (this.tryEnergyDropOff() == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.targetEnergyDropOff);
    }
  }
}
