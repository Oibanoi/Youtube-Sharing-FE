import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ListVideo from "./ListVideo";

// Mock the useVideoHook to return sample data
vi.mock("../../hooks", () => ({
  videoHooks: {
    useVideoHook: vi.fn().mockReturnValue({
      videos: [
        {
          id: "1",
          youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          title: "Sample Video",
          userName: "John Doe",
          description: "This is a sample video description.",
        },
      ],
    }),
  },
}));

describe("ListVideo component", () => {
  test("renders video information correctly", () => {
    render(<ListVideo />);

    expect(screen.getByText("Sample Video")).toBeInTheDocument();
    expect(screen.getByText("Shared by: John Doe")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample video description.")
    ).toBeInTheDocument();
  });

  test("renders iframe with correct src", () => {
    render(<ListVideo />);

    const iframe = screen.getByTitle("Sample Video");
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });
});
