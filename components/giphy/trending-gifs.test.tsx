import { screen, waitFor } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mockGifOne, mockGifTwo } from "@/hooks/use-list-trending.test";
import { render } from "@/lib/test-helpers";
import { TrendingGifs } from "./trending-gifs";

const pagination = {
  total_count: 2,
  count: 0,
  offset: 0,
};

const meta = {
  status: 200,
  msg: "OK",
  response_id: "response-id",
};

const apiEndpoint = "/api/list-trending";

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

describe("TrendingGifs", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  test("lists gifs", async () => {
    server.use(
      http.get(apiEndpoint, () => {
        return HttpResponse.json({
          data: [mockGifOne, mockGifTwo],
          pagination,
          meta,
        });
      })
    );
    render(<TrendingGifs />);
    await waitFor(() => {
      expect(screen.getByText("title-one")).toBeDefined();
    });
    expect(screen.getByText("title-two")).toBeDefined();
  });
});
