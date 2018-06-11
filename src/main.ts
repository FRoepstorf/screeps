import { ErrorMapper } from "utils/ErrorMapper";
import { SpawnManager } from "components/spawns/spawnManager";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  let spawnManager = new SpawnManager();

  //console.log(Game.spawns["Spawn1"]);
  console.log(`Name of the first spawn` + spawnManager.getNameOfFirstSpawn());
  console.log(`Instance of the spawn:` + spawnManager.getFirstSpawn());

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
