"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

require("core-js/modules/es.function.name.js");

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/concat"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var MyNamespace;

(function (_MyNamespace) {
  var StaticWorld = function () {
    function StaticWorld() {
      (0, _classCallCheck2.default)(this, StaticWorld);
      (0, _defineProperty2.default)(this, "name", "static world");
    }

    (0, _createClass2.default)(StaticWorld, [{
      key: "message",
      get: function get() {
        var _context;

        return (0, _concat.default)(_context = "".concat(this.name, ":")).call(_context, (0, _stringify.default)(this.spacetime()));
      }
    }, {
      key: "time",
      value: function time() {
        return 0xff;
      }
    }, {
      key: "space",
      value: function space() {
        return 0xff;
      }
    }, {
      key: "spacetime",
      value: function spacetime() {
        return {
          space: this.space(),
          time: this.time()
        };
      }
    }]);
    return StaticWorld;
  }();

  _MyNamespace.StaticWorld = StaticWorld;
})(MyNamespace || (MyNamespace = {}));

var world = new MyNamespace.StaticWorld();

var _default = function _default() {
  return world.message;
};

exports.default = _default;