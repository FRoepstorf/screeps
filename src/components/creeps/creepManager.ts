import {Config} from "../../utils/Config";
import {Harvester} from "./harvester";
import {Upgrader} from "./upgrader";
import {CreepFactory} from "./creepFactory";

export class CreepManager {
    private creeps: { [creepName: string]: Creep };
    private creepCount: number;
    private creepFactory: CreepFactory;
    private harvesterNames: string[] = [];
    private upgraderNames: string[] = [];

    constructor(
        creepFactory: CreepFactory
    ) {
        this.creepFactory = creepFactory;
        this.creeps = Game.creeps;
        this.creepCount = _.size(this.creeps);
        this.setCreepNames();
    }

    public createUpgrader(): void {
        this.creepFactory.spawnUpgrader();
    }

    public createHarvester(): void {
        this.creepFactory.spawnHarvester();
    }

    public upgradersGoToWork(): void {
        for (const creepName of this.upgraderNames) {
            const upgrader: Upgrader = new Upgrader(this.creeps[creepName]);
            if (!upgrader.isBagEmpty()) {
                upgrader.tryUpgrade();
                upgrader.moveToController();
            } else {
                upgrader.tryGetEnergy();
                upgrader.moveToGetEnergy();
            }
        }
    }

    public harvestersGoToWork(): void {
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
        return Config.MAX_HARVESTERS === _.size(this.harvesterNames);
    }

    public isAtMaxUpgraders(): boolean {
        return Config.MAX_UPGRADERS === _.size(this.upgraderNames);
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
