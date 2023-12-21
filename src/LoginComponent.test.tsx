import { act, fireEvent, render, screen } from "@testing-library/react";
import LoginComponent from "./LoginComponent";
import user from "@testing-library/user-event";

describe("Login component tests", () => {
  const loginServiceMock = {
    login: jest.fn(),
  };

  const setTokenMock = jest.fn();

  let container: HTMLElement;

  function setup() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    container = render(
      <LoginComponent loginService={loginServiceMock} setToken={setTokenMock} />
    ).container;
  }

  beforeEach(() => {
    setup();
  });

  afterEach(() => {});

  it("should render correctly the login component", () => {
    console.log(container.innerHTML);
    const mainElement = screen.getByRole("main");

    expect(mainElement).toBeInTheDocument();
    expect(screen.queryByTestId("resultLabel")).not.toBeInTheDocument();
  });

  it("should render correctly - query by test id", () => {
    const inputs = screen.getAllByTestId("input");

    expect(inputs).toHaveLength(3);
    expect(inputs[0].getAttribute("value")).toBe("");
    expect(inputs[1].getAttribute("value")).toBe("");
    expect(inputs[2].getAttribute("value")).toBe("Login");
  });

  it("should render correctly - query by document query", () => {
    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input");

    expect(inputs).toHaveLength(3);
    expect(inputs[0].value).toBe("");
    expect(inputs[1].value).toBe("");
    expect(inputs[2].value).toBe("Login");
  });

  it("Click login button with incomplete credentials - show required message", () => {
    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input");
    const loginButton = inputs[2];

    fireEvent.click(loginButton);

    const resultLabel = screen.getByTestId("resultLabel");

    expect(resultLabel.textContent).toBe("UserName and password required!");
  });

  it("Click login button with incomplete credentials - show required message - with user click", () => {
    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input");
    const loginButton = inputs[2];

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      user.click(loginButton);
    });

    const resultLabel = screen.getByTestId("resultLabel");

    expect(resultLabel.textContent).toBe("UserName and password required!");
  });

  it("right credentials - successful login", async () => {
    loginServiceMock.login.mockResolvedValueOnce("1234");

    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input");
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(userNameInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePassword" } });
    fireEvent.click(loginButton);

    expect(loginServiceMock.login).toHaveBeenCalledWith(
      "someUser",
      "somePassword"
    );

    const resultLabel = await screen.findByTestId("resultLabel");
    expect(resultLabel.textContent).toBe("successful login");
  });

  it("right credentials - successful login - with user calls", async () => {
    loginServiceMock.login.mockResolvedValueOnce("1234");

    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input");
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      user.click(userNameInput);
      user.keyboard("someUser");

      user.click(passwordInput);
      user.keyboard("somePassword");

      fireEvent.click(loginButton);
    });

    expect(loginServiceMock.login).toHaveBeenCalledWith(
      "someUser",
      "somePassword"
    );

    const resultLabel = await screen.findByTestId("resultLabel");
    expect(resultLabel.textContent).toBe("successful login");
  });

  it("wrong credentials - unsuccessful login", async () => {
    loginServiceMock.login.mockResolvedValueOnce(undefined);

    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input");
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(userNameInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePassword" } });
    fireEvent.click(loginButton);

    expect(loginServiceMock.login).toHaveBeenCalledWith(
      "someUser",
      "somePassword"
    );

    // we do it like this when the component takes time to render because of some function
    const resultLabel = await screen.findByTestId("resultLabel");
    expect(resultLabel.textContent).toBe("invalid credentials");
  });

  it("wrong credentials - unsuccessful login - solve act warnings", async () => {
    const result = Promise.resolve(undefined);
    loginServiceMock.login.mockReturnValueOnce(result);

    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input");
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(userNameInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePassword" } });
    fireEvent.click(loginButton);

    await result;

    expect(loginServiceMock.login).toHaveBeenCalledWith(
      "someUser",
      "somePassword"
    );

    // we do it like this when the component takes time to render because of some function
    const resultLabel = await screen.findByTestId("resultLabel");
    expect(resultLabel.textContent).toBe("invalid credentials");
  });
});
