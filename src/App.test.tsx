import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import App from "./App";

// Mock Layout to avoid errors during testing
vi.mock("./components/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
}));

// Mock routes to avoid importing all child components
vi.mock("./routes", () => ({
  default: [
    { path: "/", component: () => <h1>Home Page</h1> },
    { path: "/about", component: () => <h1>About Page</h1> },
  ],
}));

// Mock the Router to avoid nested Router error
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

describe("App component", () => {
  test("renders the home page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  test("renders the about page when navigating to /about", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/About Page/i)).toBeInTheDocument();
  });

  test("renders Layout component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });
});
