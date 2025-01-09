import { z } from "zod";
import {
  ListTrendingItemsArraySchema,
  MetaSchema,
  PaginationSchema,
} from "./list-trending-response-schema";

export const SearchResponseSchema = z.object({
  data: ListTrendingItemsArraySchema,
  pagination: PaginationSchema,
  meta: MetaSchema,
});

export type SearchResponse = z.infer<typeof SearchResponseSchema>;
