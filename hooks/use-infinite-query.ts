import { useState, useCallback, useEffect, useRef } from "react";

type QueryFunction<TPageParam, TData> = (
  pageParam: TPageParam
) => Promise<TData>;

interface UseInfiniteQueryOptions<TPageParam, TData> {
  queryFn: QueryFunction<TPageParam, TData>;
  getNextPageParam: (
    lastPage: TData,
    allPages: TData[]
  ) => TPageParam | undefined;
  initialPageParam: TPageParam;
}

export const useInfiniteQuery = <TPageParam, TData, TError = Error>({
  queryFn,
  getNextPageParam,
  initialPageParam,
}: UseInfiniteQueryOptions<TPageParam, TData>) => {
  const [data, setData] = useState<TData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TError | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPageParam, setCurrentPageParam] =
    useState<TPageParam>(initialPageParam);
  const initialFetchRef = useRef(false);

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const newPage = await queryFn(currentPageParam);
      setData((prev) => [...prev, newPage]);

      const nextParam = getNextPageParam(newPage, data);
      if (nextParam) {
        setCurrentPageParam(nextParam);
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
    } catch (err) {
      setError(err as TError);
    } finally {
      setIsLoading(false);
    }
  }, [
    queryFn,
    getNextPageParam,
    hasNextPage,
    isLoading,
    currentPageParam,
    data,
  ]);

  const reset = useCallback(() => {
    setData([]);
    setError(null);
    setHasNextPage(true);
    setCurrentPageParam(initialPageParam);
    initialFetchRef.current = false;
  }, [initialPageParam]);

  useEffect(() => {
    if (!initialFetchRef.current) {
      initialFetchRef.current = true;
      fetchNextPage();
    }
  }, [fetchNextPage]);

  return {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    reset,
  };
};
