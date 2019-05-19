export interface UpgraderInterface {
    isBagFull(): boolean;
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

    public isBagFull(): boolean {
        return this.creep.carry.energy === this.creep.carryCapacity;
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

    public tryGetEnergy(): number {
        return this.creep.withdraw(this.spawn, RESOURCE_ENERGY);
    }

    public tryUpgrade(): number {
        return this.creep.upgradeController(this.controller);
    }
}
