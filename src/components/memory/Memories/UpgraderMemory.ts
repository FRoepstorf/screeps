export class UpgraderMemory {
  private controllerId: Id<StructureController>;
  private spawnId: Id<StructureSpawn>;

  constructor(controllerId: Id<StructureController>, spawnId: Id<StructureSpawn>) {
    this.controllerId = controllerId;
    this.spawnId = spawnId;
  }

  public getControllerId(): Id<StructureController> {
    return this.controllerId;
  }

  public getSpawnId(): Id<StructureSpawn> {
    return this.spawnId;
  }
}
