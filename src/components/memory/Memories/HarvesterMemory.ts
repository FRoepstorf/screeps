export class HarvesterMemory {
  private targetSourceId: Id<Source>;
  private energyDropOffId: Id<StructureSpawn> | Id<Structure>;

  constructor(targetSourceId: Id<Source>, energyDropOffId: Id<StructureSpawn> | Id<Structure>) {
    this.targetSourceId = targetSourceId;
    this.energyDropOffId = energyDropOffId;
  }

  public getTargetSourceId(): Id<Source> {
    return this.targetSourceId;
  }

  public getEnergyDropOffId(): Id<StructureSpawn> | Id<Structure> {
    return this.energyDropOffId;
  }
}
