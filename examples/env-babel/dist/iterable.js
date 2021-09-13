"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterable = void 0;
const iterable = [];
exports.iterable = iterable;

iterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};