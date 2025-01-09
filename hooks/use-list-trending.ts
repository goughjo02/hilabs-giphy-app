import {
  ListTrendingResponseSchema,
  type ListTrendingResponse,
} from "@/components/schema/list-trending-response-schema";
import { useInfiniteQuery } from "./use-infinite-query";

const queryFn = async ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  const res = await fetch(`/api/list-trending?limit=${limit}&offset=${offset}`);
  const json = await res.json();
  const safeParseResponse = ListTrendingResponseSchema.safeParse(json);

  if (!safeParseResponse.success) {
    throw new Error(
      safeParseResponse.error.errors.map((e) => e.message).join(", ")
    );
  }
  return safeParseResponse.data;
};

const getNextPageParam = (
  lastPage: Awaited<ReturnType<typeof queryFn>>,
  allPages: ListTrendingResponse[]
) => {
  const newData = [...allPages, lastPage];
  if (
    lastPage.pagination.total_count > newData.map((e) => e.data).flat().length
  ) {
    return {
      limit: 10,
      offset: newData.map((e) => e.data).flat().length,
    };
  }
  return undefined;
};

export const useListTrending = () => {
  const res = useInfiniteQuery({
    queryFn,
    getNextPageParam,
    initialPageParam: {
      limit: 10,
      offset: 0,
    },
  });
  const data = res.data?.map((e) => e.data).flat();
  const dataWithNoRepeatedIds = data.filter(
    // there is a weird bug where some ids are repeated
    (e, i, self) => i === self.findIndex((t) => t.id === e.id)
  );
  return {
    ...res,
    data: dataWithNoRepeatedIds,
  };
};
