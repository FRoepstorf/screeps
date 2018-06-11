import { Config } from '../../utils/Config';
import { SourcesManager } from '../sources/sourcesManager';
import { SpawnManager } from '../spawns/spawnManager';
import { Harvester } from './harvester';
import { CreepAction } from './creepAction';

export class CreepManager {
  private creeps: { [creepName: string]: Creep };
  private creepNames: string[] = [];
  private creepCount: number;
  private sourcesManager: SourcesManager;
  private spawnManager: SpawnManager;
  private creepAction: CreepAction;

  constructor(
    sourcesManager: SourcesManager,
    spawnManager: SpawnManager,
    creepAction: CreepAction
  ) {
    this.creeps = Game.creeps;
    this.creepCount = _.size(this.creeps);
    this.sourcesManager = sourcesManager;
    this.spawnManager = spawnManager;
    this.creepAction = creepAction;
    this.setCreepNames();
  }

  public createHarvester(): number {
    let bodyParts: BodyPartConstant[] = Config.HARVESTER_BODY_PARTS;
    let properties: any = {
      role: 'harvester',
      target_source_id: this.sourcesManager.getFirstSource().id,
      target_enegery_dropoff_id: this.sourcesManager.getFirstSource().id,
      renew_station_id: this.spawnManager.getFirstSpawn().id
    };

    var status: number = this.spawnManager
      .getFirstSpawn()
      .canCreateCreep(bodyParts);

    if (status == OK) {
      this.spawnManager
        .getFirstSpawn()
        .createCreep(bodyParts, undefined, properties);
    }

    return status;
  }

  public harvestersGoToWork(): void {
    for (let creepName in this.creepNames) {
      if (this.creeps[creepName].memory.role == 'harvester') {
        let harvester: Harvester = new Harvester(this.creeps[creepName]);
        harvester.moveToHarvest();
      }
    }
  }

  public isAtMaxHarvesters(): boolean {
    return Config.MAX_HARVESTERS == this.creepCount;
  }

  private setCreepNames(): void {
    for (let creepName in this.creeps) {
      this.creepNames.push(creepName);
    }
  }
}
