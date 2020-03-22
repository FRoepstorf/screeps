import {UpgraderMemory} from "../memory/Memories/UpgraderMemory";
import {MemoryBuilder} from "../memory/memoryBuilder";

export interface UpgraderInterface {
    isBagEmpty(): boolean;
    tryUpgrade(): number;
    moveToController(): void;
    tryGetEnergy(): number;
    moveToGetEnergy(): void;
}

export class Upgrader implements UpgraderInterface {
    private controller: StructureController;
    private spawn: StructureSpawn;
    private creep: Creep;
    private upgraderMemory: UpgraderMemory;

    constructor(creep: Creep) {
        this.creep = creep;
        this.upgraderMemory = MemoryBuilder.buildUpgraderMemory(this.creep.memory);
        this.controller = (
            Game.getObjectById(this.upgraderMemory.getControllerId())
        ) as StructureController;
        this.spawn = (
            Game.getObjectById(this.upgraderMemory.getSpawnId())
        ) as StructureSpawn;
    }

    public isBagEmpty(): boolean {
        return this.creep.carry.energy === 0;
    }

    public moveToController(): void {
        if (this.tryUpgrade() === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.controller);
        }
    }

    public moveToGetEnergy(): void {
        if (this.tryGetEnergy() === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.spawn);
        }
    }

    public moveToConstructionSite(constructionSite: ConstructionSite): void {
        if (this.tryConstruct(constructionSite) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(constructionSite);
        }
    }

    public tryGetEnergy(): number {
        return this.creep.withdraw(this.spawn, RESOURCE_ENERGY);
    }

    public tryUpgrade(): number {
        return this.creep.upgradeController(this.controller);
    }

    public tryConstruct(constructionSite: ConstructionSite): number {
        return this.creep.build(constructionSite);
    }
}
