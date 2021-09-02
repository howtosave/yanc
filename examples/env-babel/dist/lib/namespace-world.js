"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

let MyNamespace;

(function (_MyNamespace) {
  class StaticWorld {
    constructor() {
      (0, _defineProperty2.default)(this, "name", "static world");
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
        time: this.time()
      };
    }

  }

  _MyNamespace.StaticWorld = StaticWorld;
})(MyNamespace || (MyNamespace = {}));

const world = new MyNamespace.StaticWorld();

var _default = () => world.message;

exports.default = _default;