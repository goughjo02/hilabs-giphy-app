import { renderHook, waitFor } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mockGifOne, mockGifTwo } from "./use-list-trending.test";
import { useSearch } from "./use-search";

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

describe("useSearch", () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  test("should fetch data", async () => {
    server.use(
      http.get(apiEndpoint, () => {
        return HttpResponse.json({
          data: [mockGifOne],
          pagination,
          meta,
        });
      })
    );
    const { result } = renderHook(() =>
      useSearch({
        searchQuery: "test",
      })
    );
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.data).toEqual([mockGifOne]);
  });
  test("loadMore should fetch more data", async () => {
    server.use(
      http.get(apiEndpoint, () => {
        return HttpResponse.json({
          data: [mockGifOne],
          pagination,
          meta,
        });
      })
    );
    const { result } = renderHook(() =>
      useSearch({
        searchQuery: "test",
      })
    );
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    await waitFor(() => {
      expect(result.current.data).toEqual([mockGifOne]);
    });
    expect(result.current.hasNextPage).toBe(true);
    server.use(
      http.get(apiEndpoint, () => {
        return HttpResponse.json({
          data: [mockGifTwo],
          pagination: {
            ...pagination,
            offset: 1,
          },
          meta,
        });
      })
    );
    expect(result.current.isLoading).toBe(false);
    result.current.fetchNextPage();
    await waitFor(() => {
      expect(result.current.data).toEqual([mockGifOne, mockGifTwo]);
    });
    expect(result.current.hasNextPage).toBe(false);
  });
});
