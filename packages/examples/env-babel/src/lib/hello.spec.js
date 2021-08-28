const hello = require("./hello");

test("passed test", () => {
  expect(hello).toBe("helloWorld");
});

test("failed test", () => {
  expect(hello).toBe("hello-world");
});
