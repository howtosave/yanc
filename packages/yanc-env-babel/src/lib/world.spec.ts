import world from "./world";

describe("# module static world", () => {
  it("## static world", () => {
    expect(world()).toMatch(/static world/);
  });
});
