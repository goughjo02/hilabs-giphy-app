import { z } from "zod";

export const ListTrendingResponseSchema = z.object({
  data: z.array(
    z.object({
      type: z.string(),
      id: z.string(),
      slug: z.string(),
      url: z.string(),
      bitly_url: z.string(),
      embed_url: z.string(),
      username: z.string(),
      source: z.string(),
      rating: z.string(),
      content_url: z.string().optional(),
      user: z
        .object({
          avatar_url: z.string(),
          banner_url: z.string(),
          profile_url: z.string(),
          username: z.string(),
          display_name: z.string(),
        })
        .optional(),
      source_tld: z.string(),
      source_post_url: z.string(),
      update_datetime: z.string().optional(),
      create_datetime: z.string().optional(),
      import_datetime: z.string(),
      trending_datetime: z.string(),
      images: z.object({
        // Define the images object schema here if needed
      }),
      title: z.string(),
      alt_text: z.string(),
    })
  ),
  pagination: z.object({
    total_count: z.number(),
    count: z.number(),
    offset: z.number(),
  }),
  meta: z.object({
    status: z.number(),
    msg: z.string(),
    response_id: z.string(),
  }),
});

export type ListTrendingResponse = z.infer<typeof ListTrendingResponseSchema>;
