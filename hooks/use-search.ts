"use client";

import {
  type SearchResponse,
  SearchResponseSchema,
} from "@/components/schema/search-response-schema";
import { useInfiniteQuery } from "./use-infinite-query";

const queryFn = async ({
  searchQuery,
  limit,
  offset,
}: {
  searchQuery: string;
  limit: number;
  offset: number;
}) => {
  const res = await fetch(
    `/api/search?query=${searchQuery}&limit=${limit}&offset=${offset}`
  );
  const json = await res.json();
  // Assuming you have a schema to validate the response
  const safeParseResponse = SearchResponseSchema.safeParse(json);

  if (!safeParseResponse.success) {
    throw new Error(
      safeParseResponse.error.errors.map((e) => e.message).join(", ")
    );
  }
  return safeParseResponse.data;
};

export const useSearch = ({
  searchQuery,
  enabled = true,
}: {
  searchQuery: string;
  enabled?: boolean;
}) => {
  const getNextPageParam = (
    lastPage: Awaited<ReturnType<typeof queryFn>>,
    allPages: SearchResponse[]
  ) => {
    const newData = [...allPages, lastPage];
    if (
      lastPage.pagination.total_count > newData.map((e) => e.data).flat().length
    ) {
      return {
        searchQuery: searchQuery,
        limit: 10,
        offset: newData.map((e) => e.data).flat().length,
      };
    }
    return undefined;
  };
  const res = useInfiniteQuery({
    queryFn: ({ limit, offset }) => queryFn({ searchQuery, limit, offset }),
    getNextPageParam,
    initialPageParam: {
      searchQuery,
      limit: 10,
      offset: 0,
    },
    enabled,
  });
  const data = res.data?.map((e) => e.data).flat();
  return {
    ...res,
    data,
  };
};
