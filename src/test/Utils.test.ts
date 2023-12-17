import { StringUtils, getStringInfo, toUpperCase } from "../app/Utils";

// Test suite multiple tests combined
describe("Utils test suite", () => {
  describe.only("StringUtils tests", () => {
    // F.I.R.S.T principles (fast, independent, repeatable, self-validating, thorough)
    let sut: StringUtils;

    // Setup
    beforeEach(() => {
      sut = new StringUtils(a);
      console.log("Setup");
    });

    // Teardown
    afterEach(() => {
      // clearing mocks
      console.log("Teardown");
    });

    // some options (concurent, todo)
    // alias for skip (xit)
    // alias for only (fit)
    // xit("Should return correct upperCase", () => {
    it("Should return correct upperCase", () => {
      const actual = sut.toUpperCase("abc");

      expect(actual).toBe("ABC");
      console.log("Acutal test");
    });

    // Error testing

    it("Should throw error on invalid argument - function", () => {
      function expectError() {
        sut.toUpperCase("");
      }

      expect(expectError).toThrow();
      expect(expectError).toThrow("Invalid argument!");
    });

    it("Should throw error on invalid argument - arrow function", () => {
      expect(() => sut.toUpperCase("")).toThrow("Invalid argument!");
    });

    it("Should throw error on invalid argument - try catch block", (done) => {
      try {
        sut.toUpperCase("");
        done("GetStringInfo should throw error for invalid arg!");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message", "Invalid argument!");
        done();
      }
    });
  });

  // it.only (runs only that test and ignores other)
  it("should return uppercase of valid string", () => {
    // AAA principle (arrange, act, assert)

    // arrange:
    // sut stands for (system under test)
    const sut = toUpperCase;
    const expected = "ABC";

    // act:
    const actual = sut("abc");

    // assert:
    expect(actual).toBe(expected);

    // Setup (beforeEach, setup())
    /*
    This refers to the preparation phase before the actual test execution. It involves creating
    the necessary environment, initializing variables, setting up configurations,
    or any other actions required to ensure that the system or component being tested
    is in a known state before the test runs.
    */

    // Teardown (afterEach, teardown())
    /*
    This phase occurs after the test has been executed. It involves cleaning up resources, resetting states,
    or performing any necessary actions to leave the system/component 
    in a neutral state or to ensure that the tests don’t affect subsequent test cases.
    */
  });

  describe("ToUpperCase examples", () => {
    it.each([
      {
        input: "abc",
        expected: "ABC",
      },
      {
        input: "My-String",
        expected: "MY-STRING",
      },
      {
        input: "def",
        expected: "DEF",
      },
    ])("$input toUpperCase should be $expected", ({ input, expected }) => {
      const actual = toUpperCase(input);

      expect(actual).toBe(expected);
    });
  });

  describe("getStringInfo for arg My-String should", () => {
    test("return right length", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toHaveLength(9);
      expect(actual.characters.length).toBe(9);
    });

    test("return right lower case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.lowerCase).toBe("my-string");
    });

    test("return right upper case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.upperCase).toBe("MY-STRING");
    });

    test("return right characters", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toEqual([
        "M",
        "y",
        "-",
        "S",
        "t",
        "r",
        "i",
        "n",
        "g",
      ]);
    });

    test("return right length", () => {
      const actual = getStringInfo("My-String");

      expect(actual.characters).toHaveLength(9);
      expect(actual.characters).toContain<string>("M");

      expect(actual.characters).toEqual(
        expect.arrayContaining(["S", "t", "r", "i", "n", "g", "M", "y", "-"])
      );
    });

    test("return defined extra info", () => {
      const actual = getStringInfo("My-String");

      expect(actual.extraInfo).not.toBe(undefined);
      expect(actual.extraInfo).not.toBeUndefined();
      expect(actual.extraInfo).toBeTruthy();
      expect(actual.extraInfo).toBeDefined();
    });

    test("return right extra info", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toEqual({});
    });
  });
});
