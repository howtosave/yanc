import { iterable } from "./iterable";

describe("# iterable", () => {
  it("## check value", () => {
    expect([...iterable]).toEqual([1, 2, 3]);
  });
});
