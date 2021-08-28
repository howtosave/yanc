import { hello, my, world } from "./index";

describe("# index", () => {
  it("## hello", () => {
    expect(hello()).not.toBe(null);
  });
  it("## my", () => {
    expect(my()).not.toBe(null);
  });
  it("## world", () => {
    expect(world()).not.toBe(null);
  });
});
