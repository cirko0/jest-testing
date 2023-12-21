import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCaseWithCb,
} from "../../app/doubles/OtherUtils";

describe.skip("OtherUtils test suite", () => {
  describe("OtherStringUtils tests with spies", () => {
    // Spies
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test("Use a spy to track calls", () => {
      // Only public methods appear
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");

      sut.toUpperCase("asa");

      expect(toUpperCaseSpy).toHaveBeenCalledWith("asa");
    });

    test("Use a spy to track calls to other module", () => {
      const consoleLogSpy = jest.spyOn(console, "log");

      sut.logString("abc");

      expect(consoleLogSpy).toHaveBeenCalledWith("abc");
    });

    test("Use a spy to replace the implmentation of a method", () => {
      // Like this we can also call private methods (but this should not be used)
      jest.spyOn(sut as any, "callExternalService").mockImplementation(() => {
        console.log("calling mocked implementation!!!");
      });

      (sut as any).callExternalService();
    });
  });

  describe("Tracking callbacks with Jest mocks", () => {
    // jest prebuilt fns for mocks
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);

      expect(actual).toBeUndefined();
      expect(callBackMock).toHaveBeenCalledWith("Invalid argument!");
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);

      expect(actual).toBe("ABC");
      expect(callBackMock).toHaveBeenCalledWith("called function with abc");
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("Tracking callbacks", () => {
    // Mocks (tracks the args for cb fn and also tracks times it is called)
    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      // Clearing tracking fields
      cbArgs = [];
      timesCalled = 0;
    });

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);

      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("Invalid argument!");
      expect(timesCalled).toBe(1);
    });

    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);

      expect(actual).toBe("ABC");
      expect(cbArgs).toContain("called function with abc");
      expect(timesCalled).toBe(1);
    });
  });

  it("ToUpperCase - calls callback for invalid argument", () => {
    // Fakes (simplified implementations of external services) - like this cb fn in this example
    // tells us that everything is okay in our tests but we are not checking anything about this cb fn
    const actual = toUpperCaseWithCb("", () => {});

    expect(actual).toBeUndefined();
  });

  it("ToUpperCase - calls callback for valid argument", () => {
    // Fakes (simplified implementations of external services) - like this cb fn in this example
    const actual = toUpperCaseWithCb("abc", () => {});

    expect(actual).toBe("ABC");
  });

  it("Calculates complexity", () => {
    // Stubs (incomplete objects that we are using inside our tests) - helper objs
    // we shouldn't use them in our assertions

    const someInfo = {
      length: 5,
      extraInfo: { field1: "someInfo", field2: "someOtherInfo" },
    };

    const actual = calculateComplexity(someInfo as any);

    expect(actual).toBe(10);
  });
});
