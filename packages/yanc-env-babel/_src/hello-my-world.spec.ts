import { hello, my, world } from "./hello-my-world";

describe("# hello-my-world", () => {
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
