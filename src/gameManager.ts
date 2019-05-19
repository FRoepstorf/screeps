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
        this.creepManager.upgradersGoToWork();
        this.creepManager.harvestersGoToWork();
    }
}
