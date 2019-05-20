export class ConstructionManager {
    private constructionSites: { [constructionSiteId: string]: ConstructionSite };
    private constructionSiteNames: string [] = [];

    constructor() {
        this.constructionSites = Game.constructionSites;
        this.initializeNames();
    }

    public initializeNames(): void {
        for (const constructionSiteName in this.constructionSites) {
            this.constructionSiteNames.push(constructionSiteName);
        }
    }

    public areConstructionSitesPresent(): boolean {
        return _.size(this.constructionSites) > 0;
    }

    public getConstructionSite(): ConstructionSite {
        return this.constructionSites[this.constructionSiteNames[0]];
    }
}
