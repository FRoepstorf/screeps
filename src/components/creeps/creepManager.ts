import { Config } from "../../utils/Config";

export class CreepManager {
  private creeps: { [creepName: string]: Creep };
  private creepNames: string[] = [];
  private creepCount: number;

  constructor() {
    this.creeps = Game.creeps;
    this.creepCount = _.size(this.creeps);
    this.setCreepNames();
  }

  private setCreepNames(): void {
    for (let creepName in this.creeps) {
      this.creepNames.push(creepName);
    }
  }
}
