const hello = require("./hello");

describe("# hello", () => {
  it("## hello", () => {
    expect(hello()).toBe("hello");
  });
});
