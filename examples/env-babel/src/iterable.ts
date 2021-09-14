const iterable: number[] = [];

iterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
 
export { iterable };
