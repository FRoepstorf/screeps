import {Config} from "../../utils/Config";
import {ControllerManager} from "../controllers/controllerManager";
import {SourcesManager} from "../sources/sourcesManager";
import {SpawnManager} from "../spawns/spawnManager";

export class CreepFactory {
    private spawnManager: SpawnManager;
    private controllerManager: ControllerManager;
    private sourcesManager: SourcesManager;

    constructor(
        spawnManager: SpawnManager,
        controllerManager: ControllerManager,
        sourcesManager: SourcesManager
    ) {
        this.spawnManager = spawnManager;
        this.controllerManager = controllerManager;
        this.sourcesManager = sourcesManager;
    }

    public spawnUpgrader(): void {
        const bodyParts: BodyPartConstant[] = Config.HARVESTER_BODY_PARTS;
        const creepMemory: CreepMemory = {
            controllerId: this.controllerManager.getController().id,
            role: Config.UPGRADER_ROLE,
            spawnId: this.spawnManager.getFirstSpawn().id
        };

        this.buildCreep(bodyParts, creepMemory);
    }

    public spawnHarvester(): void {
        const bodyParts: BodyPartConstant[] = Config.HARVESTER_BODY_PARTS;
        const creepMemory: CreepMemory = {
            renewStationId: this.spawnManager.getFirstSpawn().id,
            role: Config.HARVESTER_ROLE,
            targetEnergyDropoffId: this.spawnManager.getFirstSpawn().id,
            targetSourceId: this.sourcesManager.getFirstSource().id
        };

        this.buildCreep(bodyParts, creepMemory);
    }

    public spawnGuard(): void {
        const bodyParts: BodyPartConstant[] = Config.GUARD_BODY_PARTS;
        const creepMemory: CreepMemory = {
          role: Config.GUARD_ROLE
        };

        this.buildCreep(bodyParts, creepMemory);
    }

    private buildCreep(bodyParts: BodyPartConstant[], creepMemory: CreepMemory) {
        const status: number = this.spawnManager
            .getFirstSpawn().spawnCreep(bodyParts, "dryrun", this.dryRunSpawnOptions(creepMemory));

        if (status === OK) {
            this.spawnManager
                .getFirstSpawn()
                .spawnCreep(bodyParts, creepMemory.role + Game.time.toString(), this.spawnOptions(creepMemory));
        }

        return status;
    }

    private spawnOptions(creepMemory: CreepMemory): SpawnOptions {
        return {
            memory: creepMemory
        };
    }

    private dryRunSpawnOptions(creepMemory: CreepMemory): SpawnOptions {
        return {
            dryRun: true,
            memory: creepMemory
        };
    }
}
