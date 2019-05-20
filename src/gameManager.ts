import {CreepManager} from "./components/creeps/creepManager";

export class GameManager {
    private creepManager: CreepManager;

    constructor(creepManager: CreepManager) {
        this.creepManager = creepManager;
    }

    public run() {
        if (!this.creepManager.isAtMaxHarvesters()) {
            this.creepManager.createHarvester();
        }
        if (this.creepManager.isAtMaxHarvesters() && !this.creepManager.isAtMaxUpgraders()) {
            this.creepManager.createUpgrader();
        }
        if (this.creepManager.isAtMaxGuards()) {
            this.creepManager.createGuard();
        }
        this.creepManager.upgradersGoToWork();
        this.creepManager.harvestersGoToWork();
    }
}
