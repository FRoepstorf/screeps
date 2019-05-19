export class SpawnManager {
  private spawns: { [spawnName: string]: StructureSpawn };
  private spawnNames: string[] = [];

  constructor() {
    this.spawns = Game.spawns;
    this.assignNames();
  }

  public getFirstSpawn(): StructureSpawn {
    return this.spawns[this.spawnNames[0]];
  }

  public getNameOfFirstSpawn(): string {
    return this.spawnNames[0];
  }

  private assignNames(): void {
    for (const spawnName in this.spawns) {
      this.spawnNames.push(spawnName);
    }
  }
}
