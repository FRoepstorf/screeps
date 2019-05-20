export class Guard {
    private creep: Creep;
    private hostile: Creep;

    constructor(creep: Creep, hostile: Creep) {
        this.creep = creep;
        this.hostile = hostile;
    }

    public tryAttack() {
        if (this.creep.attack(this.hostile) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.hostile);
        }
    }
}
