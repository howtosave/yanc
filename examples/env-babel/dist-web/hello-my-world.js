"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

_Object$defineProperty(exports, "hello", {
  enumerable: true,
  get: function get() {
    return _hello.default;
  }
});

_Object$defineProperty(exports, "my", {
  enumerable: true,
  get: function get() {
    return _my.default;
  }
});

_Object$defineProperty(exports, "world", {
  enumerable: true,
  get: function get() {
    return _world.default;
  }
});

var _hello = _interopRequireDefault(require("./lib/hello"));

var _my = _interopRequireDefault(require("./lib/my"));

var _world = _interopRequireDefault(require("./lib/world"));

var _namespaceWorld = _interopRequireDefault(require("./lib/namespace-world"));

console.log(">>>", (0, _hello.default)(), (0, _my.default)(), (0, _world.default)(), (0, _namespaceWorld.default)());