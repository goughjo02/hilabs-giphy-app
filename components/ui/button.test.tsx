import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  test("it calls click function", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    const button = screen.getByRole("button", {
      name: /click me/i,
    });
    expect(onClick).toHaveBeenCalledTimes(0);
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
