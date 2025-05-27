import { construct } from "./script";

describe("Test lists", () => {
  test("Checking that last node added is at the end of the list", () => {
    let lastNode = new construct.Node(1);
    construct.List.append(lastNode);
    expect(construct.List.tail).toBe(lastNode);
  });
});
