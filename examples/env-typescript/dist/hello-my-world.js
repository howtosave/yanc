"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.world = exports.my = exports.hello = void 0;
const hello_1 = __importDefault(require("./lib/hello"));
exports.hello = hello_1.default;
const my_1 = __importDefault(require("./lib/my"));
exports.my = my_1.default;
const world_1 = __importDefault(require("./lib/world"));
exports.world = world_1.default;
const namespace_world_1 = __importDefault(require("./lib/namespace-world"));
console.log(">>>>>", (0, hello_1.default)(), (0, my_1.default)(), (0, world_1.default)(), (0, namespace_world_1.default)());
