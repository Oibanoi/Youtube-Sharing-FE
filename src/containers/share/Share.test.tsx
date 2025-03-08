import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import Share from "./Share";
import { videoHooks } from "../../hooks";

// Mock useVideoHook to return sample data
vi.mock("../../hooks", () => ({
  videoHooks: {
    useVideoHook: vi.fn().mockReturnValue({
      postVideo: vi.fn().mockResolvedValue({}),
    }),
  },
}));

describe("Share component", () => {
  test("renders share form", () => {
    render(
      <MemoryRouter>
        <Share />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("YouTube URL")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Share/i })).toBeInTheDocument();
  });

  test("shows error message when YouTube URL is not provided", async () => {
    render(
      <MemoryRouter>
        <Share />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Share/i }));

    expect(
      await screen.findByText("Please enter a YouTube URL")
    ).toBeInTheDocument();
  });

  test("calls postVideo function when form is submitted", async () => {
    const postVideoMock = vi.fn().mockResolvedValue({});
    (videoHooks.useVideoHook as Mock).mockReturnValue({
      postVideo: postVideoMock,
    });

    render(
      <MemoryRouter>
        <Share />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter YouTube URL"), {
      target: { value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Share/i }));

    expect(postVideoMock).toHaveBeenCalledWith(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    );
  });
});
