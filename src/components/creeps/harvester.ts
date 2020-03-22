import {HarvesterMemory} from "../memory/Memories/HarvesterMemory";
import {MemoryBuilder} from "../memory/memoryBuilder";

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
  private harvesterMemory: HarvesterMemory;

  constructor(creep: Creep) {
    this.creep = creep;
    this.harvesterMemory = MemoryBuilder.buildHarvesterMemory(creep.memory);
    this.targetSource = (
      Game.getObjectById(this.harvesterMemory.getTargetSourceId())
    ) as Source;
    this.targetEnergyDropOff = (
      Game.getObjectById(this.harvesterMemory.getEnergyDropOffId())
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
    if (this.tryEnergyDropOff() === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.targetEnergyDropOff);
    }
  }
}
