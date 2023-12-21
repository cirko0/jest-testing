import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import { IncomingMessage, ServerResponse } from "http";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../../app/server_app/model/ServerModel";

// Jest function mocking
const getRequestBodyMock = jest.fn();

// Jest mocking modules
jest.mock("../../../app/server_app/utils/Utils", () => ({
  getRequestBody: () => getRequestBodyMock(),
}));

// Test suite
describe("RegisterHandler test suite", () => {
  // System under test
  let sut: RegisterHandler;

  // Dummy objects

  const someAccount = {
    id: "",
    password: "somePassword",
    userName: "someUserName",
  };

  const someId = "1234";

  // Mocked objects

  const request = {
    method: undefined,
  };

  const responseMock = {
    statusCode: 0,
    // We mock this functions inside to control the workflow of our tests
    // Mocks are used to replace parts of the system, enabling behavior verification
    writeHead: jest.fn(),
    write: jest.fn(),
  };

  const authorizerMock = {
    registerUser: jest.fn(),
  };

  // Setup
  beforeEach(() => {
    // Like this we inject the mocks when they are managed in the constructor of our class
    sut = new RegisterHandler(
      request as IncomingMessage,
      responseMock as any as ServerResponse,
      authorizerMock as any as Authorizer
    );
  });

  // Teardown
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register valid accounts in requests", async () => {
    request.method = HTTP_METHODS.POST;
    getRequestBodyMock.mockResolvedValueOnce(someAccount);
    authorizerMock.registerUser.mockResolvedValueOnce(someId);

    await sut.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, {
      "Content-Type": "application/json",
    });
    expect(responseMock.write).toHaveBeenCalledWith(
      JSON.stringify({ userId: someId })
    );
  });
  it("should not register invalid accounts in requests", async () => {
    request.method = HTTP_METHODS.POST;
    getRequestBodyMock.mockResolvedValueOnce({});

    await sut.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(responseMock.writeHead).toHaveBeenCalledWith(
      HTTP_CODES.BAD_REQUEST,
      {
        "Content-Type": "application/json",
      }
    );
    expect(responseMock.write).toHaveBeenCalledWith(
      JSON.stringify("userName and password required")
    );
  });

  it("should do nothing for not supported http methods", async () => {
    request.method = HTTP_METHODS.GET;

    await sut.handleRequest();

    expect(responseMock.writeHead).not.toHaveBeenCalled();
    expect(responseMock.write).not.toHaveBeenCalled();
    expect(getRequestBodyMock).not.toHaveBeenCalled();
  });
});
