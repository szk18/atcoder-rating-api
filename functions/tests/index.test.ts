import { getRatingColor } from "../src/index";

describe("test of getRatingColor func", () => {
  test("should 200 to be gray", () => {
    expect(getRatingColor(200)).toBe("gray");
  });
  test("should 600 to be brown", () => {
    expect(getRatingColor(600)).toBe("brown");
  });
  test("should 1000 to be green", () => {
    expect(getRatingColor(1000)).toBe("green");
  });
  test("should 1400 to be lightBlue", () => {
    expect(getRatingColor(1400)).toBe("lightBlue");
  });
  test("should 1800 to be blue", () => {
    expect(getRatingColor(1800)).toBe("blue");
  });
  test("should 2200 to be yellow", () => {
    expect(getRatingColor(2200)).toBe("yellow");
  });
  test("should 2600 to be orange", () => {
    expect(getRatingColor(2600)).toBe("orange");
  });
  test("should 3000 to be red", () => {
    expect(getRatingColor(3000)).toBe("red");
  });
  test("should 2600 to be orange", () => {
    expect(getRatingColor(2600)).toBe("orange");
  });
  test("should negative number throw RangeError", () => {
    expect(() => getRatingColor(-1)).toThrowError(RangeError);
  });
});
