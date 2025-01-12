import { screen, waitFor } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mockGifOne, mockGifTwo } from "@/hooks/use-list-trending.test";
import { render } from "@/lib/test-helpers";
import { SearchGifs } from "./search-gifs";
import userEvent from "@testing-library/user-event";

const pagination = {
  total_count: 1,
  count: 0,
  offset: 0,
};

const meta = {
  status: 200,
  msg: "OK",
  response_id: "response-id",
};

const apiEndpoint = "/api/search";

export const handlers = [
  http.get(apiEndpoint, () => {
    return HttpResponse.json({
      data: [],
      pagination,
      meta,
    });
  }),
];

const server = setupServer(...handlers);

describe("SearchGifs", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  test("accepts user input and searches gifs", async () => {
    server.use(
      http.get(apiEndpoint, () => {
        return HttpResponse.json({
          data: [mockGifOne],
          pagination,
          meta,
        });
      })
    );
    render(<SearchGifs />);
    const input = screen.getByRole("textbox", { name: "Search GIFs" });
    await userEvent.type(input, "cats");
    await waitFor(() => {
      expect(screen.getByText("title-one")).toBeDefined();
    });
    expect(() => screen.getByText("title-two")).toThrow();
    server.use(
      http.get(apiEndpoint, () => {
        return HttpResponse.json({
          data: [mockGifTwo],
          pagination,
          meta,
        });
      })
    );
    await userEvent.type(input, "cats");
    await waitFor(() => {
      expect(screen.getByText("title-two")).toBeDefined();
    });
    expect(() => screen.getByText("title-one")).toThrow();
  });
});
