import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Home from "./Home";

// Mock ListVideo to avoid rendering the actual component
vi.mock("../../components/Videos/ListVideo", () => ({
  default: () => <div data-testid="list-video"></div>,
}));

describe("Home component", () => {
  test("renders ListVideo component", () => {
    render(<Home />);

    expect(screen.getByTestId("list-video")).toBeInTheDocument();
  });
});
