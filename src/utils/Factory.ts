import {GameManager} from "gameManager";
import {ControllerManager} from "../components/controllers/controllerManager";
import {CreepManager} from "../components/creeps/creepManager";
import {RoomManager} from "../components/rooms/roomManager";
import {SourcesManager} from "../components/sources/sourcesManager";
import {SpawnManager} from "../components/spawns/spawnManager";
import {CreepFactory} from "../components/creeps/creepFactory";

export class Factory {

    public createGameManager(): GameManager {
        return new GameManager(this.createCreepManager());
    }

    private createCreepManager(): CreepManager {
        return new CreepManager(
            this.createCreepFactory()
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


    private createControllerManager(): ControllerManager {
        return new ControllerManager(this.createRoomManager().getFirstRoom().controller);
    }

    private sources(): Source[] {
        return this.createRoomManager().getFirstRoom().find(FIND_SOURCES_ACTIVE);
    }
}
