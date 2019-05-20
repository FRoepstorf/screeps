import {GameManager} from "gameManager";
import {ConstructionManager} from "../components/constructions/constructionManager";
import {ControllerManager} from "../components/controllers/controllerManager";
import {CreepFactory} from "../components/creeps/creepFactory";
import {CreepManager} from "../components/creeps/creepManager";
import {RoomManager} from "../components/rooms/roomManager";
import {SourcesManager} from "../components/sources/sourcesManager";
import {SpawnManager} from "../components/spawns/spawnManager";

export class Factory {

    public createGameManager(): GameManager {
        return new GameManager(this.createCreepManager());
    }

    private createCreepManager(): CreepManager {
        return new CreepManager(
            this.createCreepFactory(),
            this.createConstructionManager(),
            this.createRoomManager().getHostiles()
        );
    }

    private createCreepFactory(): CreepFactory {
        return new CreepFactory(
            this.createSpawnManager(),
            this.createControllerManager(),
            this.createSourcesManager()
        );
    }

    private createSourcesManager(): SourcesManager {
        return new SourcesManager(
            this.createRoomManager(),
            this.sources()
        );
    }

    private createSpawnManager(): SpawnManager {
        return new SpawnManager();
    }

    private createRoomManager(): RoomManager {
        return new RoomManager();
    }

    private createConstructionManager(): ConstructionManager {
        return new ConstructionManager();
    }

    private createControllerManager(): ControllerManager {
        return new ControllerManager(this.createRoomManager().getFirstRoom().controller);
    }

    private sources(): Source[] {
        return this.createRoomManager().getFirstRoom().find(FIND_SOURCES_ACTIVE);
    }
}
