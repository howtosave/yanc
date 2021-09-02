"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StaticWorld {
    constructor() {
        this.name = "static world";
    }
    get message() {
        return `${this.name}:${JSON.stringify(this.spacetime())}`;
    }
    time() {
        return 0xff;
    }
    space() {
        return 0xff;
    }
    spacetime() {
        return {
            space: this.space(),
            time: this.time(),
        };
    }
}
const world = new StaticWorld();
exports.default = () => world.message;
