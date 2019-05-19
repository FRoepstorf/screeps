export class ControllerManager {
    private controller: StructureController | undefined;

    constructor(controller: StructureController | undefined) {
        this.controller = controller;
    }

    public getController(): StructureController {
        return this.controller as StructureController;
    }
}
