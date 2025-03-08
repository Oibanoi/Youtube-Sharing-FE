import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Layout from "./index";
import { useUser } from "../../context/UserContext";
import { userHooks } from "../../hooks";

vi.mock("../../context/UserContext", () => ({
  useUser: vi.fn(),
}));

vi.mock("../../hooks", () => ({
  userHooks: {
    useUserHook: vi.fn().mockReturnValue({
      login: vi.fn(),
      loading: false,
    }),
  },
}));

describe("Layout component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders login form when user is not logged in", () => {
    (useUser as vi.Mock).mockReturnValue({
      user: null,
      setUser: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("renders user info and logout button when user is logged in", () => {
    (useUser as vi.Mock).mockReturnValue({
      user: { email: "test@example.com" },
      setUser: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Share a movie")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("calls login function when login button is clicked", () => {
    const loginMock = vi.fn().mockResolvedValue({});
    (useUser as vi.Mock).mockReturnValue({
      user: null,
      setUser: vi.fn(),
    });
    (userHooks.useUserHook as vi.Mock).mockReturnValue({
      login: loginMock,
      loading: false,
    });

    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Login"));

    expect(loginMock).toHaveBeenCalledWith("test@example.com", "password");
  });
});
