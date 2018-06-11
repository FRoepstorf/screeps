import { Config } from "../../utils/Config";

export interface CreepActionInterface {
  moveTo(target: RoomPosition | { pos: RoomPosition }): number;
  needsRenew(): boolean;
  tryRenew(): number;
  moveToRenew(): void;
}

export class CreepAction implements CreepActionInterface {
  private creep: Creep;
  private renewStation: StructureSpawn;
  private minLifeBeforeNeedsRenew: number;

  constructor(creep: Creep, renewStation: StructureSpawn) {
    this.creep = creep;
    this.renewStation = renewStation;
    this.minLifeBeforeNeedsRenew = Config.MIN_LIFE_BEFORE_RENEW;
  }

  public moveTo(target: RoomPosition | { pos: RoomPosition }): number {
    return this.creep.moveTo(target);
  }

  public needsRenew(): boolean {
    return this.creep.ticksToLive <= Config.MIN_LIFE_BEFORE_RENEW;
  }

  public tryRenew(): number {
    return this.renewStation.renewCreep(this.creep);
  }

  public moveToRenew(): void {
    if (this.tryRenew() == ERR_NOT_IN_RANGE) {
      this.moveTo(this.renewStation);
    }
  }

  public getCreep(): Creep {
    return this.creep;
  }
}
