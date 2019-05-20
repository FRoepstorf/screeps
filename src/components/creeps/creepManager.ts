import {Config} from "../../utils/Config";
import {ConstructionManager} from "../constructions/constructionManager";
import {CreepFactory} from "./creepFactory";
import {Harvester} from "./harvester";
import {Upgrader} from "./upgrader";
import {Guard} from "./guard";

export class CreepManager {
    private creeps: { [creepName: string]: Creep };
    private creepCount: number;
    private creepFactory: CreepFactory;
    private constructionManager: ConstructionManager;
    private harvesterNames: string[] = [];
    private upgraderNames: string[] = [];
    private guardNames: string[] = [];
    private hostileCreeps: Creep[];

    constructor(
        creepFactory: CreepFactory,
        constructionManager: ConstructionManager,
        hostileCreeps: Creep[]
    ) {
        this.creepFactory = creepFactory;
        this.creeps = Game.creeps;
        this.constructionManager = constructionManager;
        this.hostileCreeps = hostileCreeps;
        this.creepCount = _.size(this.creeps);
        this.setCreepNames();
    }

    public createUpgrader(): void {
        this.creepFactory.spawnUpgrader();
    }

    public createHarvester(): void {
        this.creepFactory.spawnHarvester();
    }

    public createGuard(): void {
        this.creepFactory.spawnGuard();
    }

    public upgradersGoToWork(): void {
        for (const creepName of this.upgraderNames) {
            const upgrader: Upgrader = new Upgrader(this.creeps[creepName]);
            if (!upgrader.isBagEmpty()) {
                if (this.constructionManager.areConstructionSitesPresent()) {
                    upgrader.moveToConstructionSite(this.constructionManager.getConstructionSite());
                }
                upgrader.moveToController();
            } else {
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

    public guardsGoToWork(): void {
        for (const creepName of this.guardNames) {
            const guard: Guard = new Guard(this.creeps[creepName], this.hostileCreeps[0]);
            guard.tryAttack();
        }
    }

    public isAtMaxHarvesters(): boolean {
        return Config.MAX_HARVESTERS === _.size(this.harvesterNames);
    }

    public isAtMaxUpgraders(): boolean {
        return Config.MAX_UPGRADERS === _.size(this.upgraderNames);
    }

    public isAtMaxGuards(): boolean {
        return Config.MAX_GUARDS === _.size(this.guardNames);
    }

    private setCreepNames(): void {
        for (const creepName in this.creeps) {
            const upgraderPattern = new RegExp("^upgrader");
            const guardPattern = new RegExp("^guard");
            if (upgraderPattern.test(creepName)) {
                this.upgraderNames.push(creepName);
            } else if (guardPattern.test(creepName)) {
                this.guardNames.push(creepName);
            } else {
                this.harvesterNames.push(creepName);
            }
        }
    }
}
