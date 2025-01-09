import { describe, expect, test } from "vitest";
import { ThemeToggle } from "./theme-toggle";
import { render, screen } from "@testing-library/react";

describe("theme-toggle", () => {
  test("it renders screen reader text", async () => {
    render(<ThemeToggle />);
    const themeToggleButton = screen.getByRole("button", {
      name: "Toggle theme",
    });
    expect(themeToggleButton).toBeDefined();
  });
});
