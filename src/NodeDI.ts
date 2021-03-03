import * as fs from "fs";
import { join } from "path";

const diCache = new Map<any, string>();

declare var require: any;

export default class NodeDI {

    public lang: string = "en-US";

    public version: string = "";

    constructor() {
        const pn = join(__dirname, "../../package.json");
        const p = JSON.parse(fs.readFileSync(pn, { encoding: "utf8", flag: "r"}));
        this.version = p.version;
    }

    public inject(target: any, inject: string): void {
        diCache[target] = inject;
    }
    public mockType(): void {
        // do nothing
    }
    public resolveType(key: any): any {
        const inject = diCache.get(key);
        if (inject) {
            return require(inject.replace("{lang}", this.lang)).default;
        }
        return key;
    }

    public resolvePath(path: string): string {
        const tokens = path.split("/");
        if (tokens[0].startsWith("@")) {
            tokens[1] = tokens[1] + "@" + this.version;
        } else {
            // ...
        }
        path = tokens.join("/");
        return `https://npm-git.azureedge.net/npm/package/${path}`;
    }

}
