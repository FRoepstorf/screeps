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

    constructor(creep: Creep) {
        this.creep = creep;
        this.controller = (
            Game.getObjectById(this.creep.memory.controller_id)
        ) as StructureController;
        this.spawn = (
            Game.getObjectById(this.creep.memory.spawn_id)
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
