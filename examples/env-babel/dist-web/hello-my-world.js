"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "hello", {
  enumerable: true,
  get: function () {
    return _hello.default;
  }
});
Object.defineProperty(exports, "my", {
  enumerable: true,
  get: function () {
    return _my.default;
  }
});
Object.defineProperty(exports, "world", {
  enumerable: true,
  get: function () {
    return _world.default;
  }
});

var _hello = _interopRequireDefault(require("./lib/hello"));

var _my = _interopRequireDefault(require("./lib/my"));

var _world = _interopRequireDefault(require("./lib/world"));

var _namespaceWorld = _interopRequireDefault(require("./lib/namespace-world"));

const sym = Symbol();
console.log(">>>", (0, _hello.default)(), (0, _my.default)(), (0, _world.default)(), (0, _namespaceWorld.default)(), sym.toString());