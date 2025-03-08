import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Register from "./Register";

vi.mock("../../hooks", () => ({
  userHooks: {
    useUserHook: vi.fn().mockReturnValue({
      signUp: vi.fn().mockResolvedValue({}),
    }),
  },
}));

describe("Register component", () => {
  test("renders registration form", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Confirm your password")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Register/i })
    ).toBeInTheDocument();
  });

  test("shows error message when passwords do not match", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { value: "password456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    expect(
      await screen.findByText("The two passwords do not match!")
    ).toBeInTheDocument();
  });
});
