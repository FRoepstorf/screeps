declare global {
  interface CreepMemory {
    [target_source_id: string]: any;
    [target_energy_dropoff: string]: any;
  }
}

export namespace Config {
  export const MIN_LIFE_BEFORE_RENEW: number = 700;
  export const MAX_HARVESTERS: number = 2;
  export const MAX_UPGRADERS: number = 1;
  export const MAX_GUARDS: number = 1;
  export const HARVESTER_BODY_PARTS: BodyPartConstant[] = [
    MOVE,
    MOVE,
    CARRY,
    WORK
  ];
  export const GUARD_BODY_PARTS: BodyPartConstant[] = [
      MOVE,
      MOVE,
      ATTACK,
      ATTACK,
      TOUGH
  ];
}
