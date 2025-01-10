import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useInfiniteQuery } from "./use-infinite-query";

describe("useInfiniteQuery", () => {
  test("calls queryFn and getNextPageParams on render", async () => {
    const queryFn: (args: {
      limit: number;
      offset: number;
    }) => Promise<{ data: string[]; pagination: { totalCount: number } }> =
      vi.fn();
    renderHook(() =>
      useInfiniteQuery({
        queryFn,
        getNextPageParam: vi.fn(),
        initialPageParam: {
          limit: 0,
          offset: 0,
        },
      })
    );
    await waitFor(() => {
      expect(queryFn).toHaveBeenCalledTimes(1);
      expect(queryFn).toHaveBeenCalledWith({ limit: 0, offset: 0 });
    });
  });
  test("fetchNextPage calls queryFn and getNextPageParams for a second time", async () => {
    const queryFn: (args: { limit: number; offset: number }) => Promise<{
      data: string[];
      pagination: {
        totalCount: number;
      };
    }> = vi.fn().mockResolvedValue({
      data: ["one", "two", "three"],
      pagination: { totalCount: 6 },
    });
    const getNextPageParam: (
      lastPage: { data: string[]; pagination: { totalCount: number } },
      allPages: { data: string[]; pagination: { totalCount: number } }[]
    ) => { limit: number; offset: number } | undefined = vi
      .fn()
      .mockResolvedValue({
        limit: 10,
        offset: 0,
      });
    const { result } = renderHook(() =>
      useInfiniteQuery({
        queryFn,
        getNextPageParam,
        initialPageParam: {
          limit: 10,
          offset: 0,
        },
      })
    );
    await waitFor(() => {
      expect(queryFn).toHaveBeenCalledTimes(1);
      expect(queryFn).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    });
    expect(getNextPageParam).toHaveBeenCalledTimes(1);
    expect(getNextPageParam).toHaveBeenCalledWith(
      { data: ["one", "two", "three"], pagination: { totalCount: 6 } },
      []
    );
    result.current.fetchNextPage();
    await waitFor(() => {
      expect(queryFn).toHaveBeenCalledTimes(2);
      expect(queryFn).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    });
    await waitFor(() => {
      expect(getNextPageParam).toHaveBeenCalledTimes(2);
      expect(getNextPageParam).toHaveBeenCalledWith(
        { data: ["one", "two", "three"], pagination: { totalCount: 6 } },
        [
          {
            data: ["one", "two", "three"],
            pagination: { totalCount: 6 },
          },
        ]
      );
    });
  });
});
