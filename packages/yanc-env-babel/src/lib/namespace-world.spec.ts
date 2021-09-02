import world from "./namespace-world";

describe("# namespace static world", () => {
  it("## static world", () => {
    expect(world()).toMatch(/static world/);
  });
});
