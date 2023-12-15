// Pay attention to this ()
jest.mock("../../app/doubles/OtherUtils", () => ({
  // All fn of this module will be kept but only calculateComplexity will be mocked
  ...jest.requireActual("../../app/doubles/OtherUtils"),
  calculateComplexity: () => {
    return 10;
  },
}));

jest.mock("uuid", () => ({
  // Mocking external library
  v4: () => "123",
}));

import * as OtherUtils from "../../app/doubles/OtherUtils";

describe("module tests", () => {
  test("calculate complexity", () => {
    const actual = OtherUtils.calculateComplexity({} as any);
    expect(actual).toBe(10);
  });

  test("keep other functions", () => {
    const actual = OtherUtils.toUpperCase("abc");
    expect(actual).toBe("ABC");
  });

  test("string with id", () => {
    const actual = OtherUtils.toLowerCaseWithId("ABC");
    expect(actual).toBe("abc123");
  });
});
