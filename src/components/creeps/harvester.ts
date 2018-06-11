import { Config } from '../../utils/Config';
import { CreepAction, CreepActionInterface } from './creepAction';

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
    this.targetSource = <Source>(
      Game.getObjectById(this.creep.memory.target_source_id)
    );
    this.targetEnergyDropOff = <StructureSpawn | Structure>(
      Game.getObjectById(this.creep.target_enegery_dropoff)
    );
  }

  isBagFull(): boolean {
    return this.creep.carry.energy == this.creep.carryCapacity;
  }

  tryHarvest(): number {
    return this.creep.harvest(this.targetSource);
  }

  moveToHarvest(): void {
    if (this.tryHarvest() == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.targetSource);
    }
  }

  tryEnergyDropOff(): number {
    return this.creep.transfer(this.targetEnergyDropOff, RESOURCE_ENERGY);
  }

  moveToDropEnergy(): void {
    if (this.tryEnergyDropOff() == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.targetEnergyDropOff);
    }
  }
}
