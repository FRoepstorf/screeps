import { Config } from "../../utils/Config";

export interface CreepActionInterface {
  moveTo(creep: Creep, target: RoomPosition | { pos: RoomPosition }): number;
  needsRenew(creep: Creep): boolean;
  tryRenew(creep: Creep): number;
  moveToRenew(creep: Creep): void;
}

export class CreepAction implements CreepActionInterface {
  private renewStation: StructureSpawn;
  private minLifeBeforeNeedsRenew: number;

  constructor(renewStation: StructureSpawn) {
    this.renewStation = renewStation;
    this.minLifeBeforeNeedsRenew = Config.MIN_LIFE_BEFORE_RENEW;
  }

  public moveTo(
    creep: Creep,
    target: RoomPosition | { pos: RoomPosition }
  ): number {
    return creep.moveTo(target);
  }

  public needsRenew(creep: Creep): boolean {
    return creep.ticksToLive! <= Config.MIN_LIFE_BEFORE_RENEW;
  }

  public tryRenew(creep: Creep): number {
    return this.renewStation.renewCreep(creep);
  }

  public moveToRenew(creep: Creep): void {
    if (this.tryRenew(creep) == ERR_NOT_IN_RANGE) {
      this.moveTo(creep, this.renewStation);
    }
  }
}
