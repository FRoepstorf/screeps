// tslint:disable-next-line:no-namespace
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
