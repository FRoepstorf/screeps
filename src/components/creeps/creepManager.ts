import {Config} from "../../utils/Config";
import {ControllerManager} from "../controllers/controllerManager";
import {SourcesManager} from "../sources/sourcesManager";
import {SpawnManager} from "../spawns/spawnManager";
import {Harvester} from "./harvester";
import {Upgrader} from "./upgrader";

export class CreepManager {
    private creeps: { [creepName: string]: Creep };
    private creepCount: number;
    private harvesterNames: string[] = [];
    private upgraderNames: string[] = [];
    private sourcesManager: SourcesManager;
    private spawnManager: SpawnManager;
    private controllerManager: ControllerManager;

    constructor(
        sourcesManager: SourcesManager,
        spawnManager: SpawnManager,
        controllerManager: ControllerManager
    ) {
        this.creeps = Game.creeps;
        this.creepCount = _.size(this.creeps);
        this.sourcesManager = sourcesManager;
        this.spawnManager = spawnManager;
        this.controllerManager = controllerManager;
        this.setCreepNames();
    }

    public createUpgrader(): number {
        const bodyParts: BodyPartConstant[] = Config.HARVESTER_BODY_PARTS;
        const creepMemory: CreepMemory = {
            controller_id: this.controllerManager.getController().id,
            role: "upgrader",
            spawn_id: this.spawnManager.getFirstSpawn().id
        };

        const dryrunSpawnOptions: SpawnOptions = {
            dryRun: true,
            memory: creepMemory
        };

        const spawnOptions: SpawnOptions = {
            memory: creepMemory
        };

        const status: number = this.spawnManager
            .getFirstSpawn().spawnCreep(bodyParts, "dryrun", dryrunSpawnOptions);

        if (status === OK) {
            this.spawnManager
                .getFirstSpawn()
                .spawnCreep(bodyParts, creepMemory.role + Game.time.toString(), spawnOptions);
        }

        return status;
    }

    public createHarvester(): number {
        const bodyParts: BodyPartConstant[] = Config.HARVESTER_BODY_PARTS;
        const creepMemory: CreepMemory = {
            renew_station_id: this.spawnManager.getFirstSpawn().id,
            role: "harvester",
            target_energy_dropoff_id: this.spawnManager.getFirstSpawn().id,
            target_source_id: this.sourcesManager.getFirstSource().id
        };

        const dryrunSpawnOptions: SpawnOptions = {
            dryRun: true,
            memory: creepMemory
        };

        const spawnOptions: SpawnOptions = {
            memory: creepMemory
        };

        const status: number = this.spawnManager
            .getFirstSpawn().spawnCreep(bodyParts, "dryrun", dryrunSpawnOptions);

        if (status === OK) {
            this.spawnManager
                .getFirstSpawn()
                .spawnCreep(bodyParts, creepMemory.role + Game.time.toString(), spawnOptions);
        }

        return status;
    }

    public upgradersGoToWork(): void {
        console.log(this.upgraderNames);
        for (const creepName of this.upgraderNames) {
            const upgrader: Upgrader = new Upgrader(this.creeps[creepName]);
            if (upgrader.isBagFull()) {
                upgrader.tryUpgrade();
                upgrader.moveToController();
            } else {
                upgrader.tryGetEnergy();
                upgrader.moveToGetEnergy();
            }
        }
    }

    public harvestersGoToWork(): void {
        console.log(this.harvesterNames);
        for (const creepName of this.harvesterNames) {
            const harvester: Harvester = new Harvester(this.creeps[creepName]);
            if (harvester.isBagFull()) {
                console.log(harvester.tryEnergyDropOff());
                harvester.tryEnergyDropOff();
                harvester.moveToDropEnergy();
            } else {
                harvester.moveToHarvest();
            }
        }
    }

    public isAtMaxHarvesters(): boolean {
        return Config.MAX_HARVESTERS === this.creepCount;
    }

    private setCreepNames(): void {
        for (const creepName in this.creeps) {
            const regex = new RegExp("^upgrader");
            if (regex.test(creepName)) {
                this.upgraderNames.push(creepName);
            } else {
                this.harvesterNames.push(creepName);
            }
        }
    }
}
