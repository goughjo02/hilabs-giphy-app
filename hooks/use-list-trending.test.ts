import { renderHook, waitFor } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { ListTrendingResponse } from "@/components/schema/list-trending-response-schema";
import { useListTrending } from "./use-list-trending";

const mockGifOne: ListTrendingResponse["data"][number] = {
  type: "gif",
  id: "id-one",
  slug: "slug-one",
  url: "url-one",
  bitly_url: "bitly_url-one",
  embed_url: "embed_url-one",
  username: "username-one",
  source: "source-one",
  rating: "rating-one",
  content_url: "content_url-one",
  user: {
    avatar_url: "avatar_url-one",
    banner_url: "banner_url-one",
    profile_url: "profile_url-one",
    username: "username-one",
    display_name: "display_name-one",
  },
  source_tld: "source_tld-one",
  source_post_url: "source_post_url-one",
  update_datetime: "update_datetime-one",
  create_datetime: "create_datetime-one",
  import_datetime: "import_datetime-one",
  trending_datetime: "trending_datetime-one",
  images: {
    // Define the images object schema here if needed
  },
  title: "title-one",
  alt_text: "alt_text-one",
};

const mockGifTwo: ListTrendingResponse["data"][number] = {
  type: "gif",
  id: "id-two",
  slug: "slug-two",
  url: "url-two",
  bitly_url: "bitly_url-two",
  embed_url: "embed_url-two",
  username: "username-two",
  source: "source-two",
  rating: "rating-two",
  content_url: "content_url-two",
  user: {
    avatar_url: "avatar_url-two",
    banner_url: "banner_url-two",
    profile_url: "profile_url-two",
    username: "username-two",
    display_name: "display_name-two",
  },
  source_tld: "source_tld-two",
  source_post_url: "source_post_url-two",
  update_datetime: "update_datetime-two",
  create_datetime: "create_datetime-two",
  import_datetime: "import_datetime-two",
  trending_datetime: "trending_datetime-two",
  images: {
    // Define the images object schema here if needed
  },
  title: "title-two",
  alt_text: "alt_text-two",
};

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

describe("useListTrendingGiphy", () => {
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
    const { result } = renderHook(() => useListTrending());
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
    const { result } = renderHook(() => useListTrending());
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
