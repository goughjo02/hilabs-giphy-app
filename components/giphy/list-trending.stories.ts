import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ListTrending } from "./list-trending";
import { type ListTrendingResponse } from "../schema/list-trending-response-schema";

function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateMockGifs(count: number): ListTrendingResponse["data"] {
  const mockGifs = [];
  for (let i = 0; i < count; i++) {
    const mockGif: ListTrendingResponse["data"][number] = {
      type: "gif",
      id: generateRandomString(8),
      slug: generateRandomString(8),
      url: generateRandomString(8),
      bitly_url: generateRandomString(8),
      embed_url: generateRandomString(8),
      username: generateRandomString(8),
      source: generateRandomString(8),
      rating: generateRandomString(8),
      content_url: generateRandomString(8),
      user: {
        avatar_url: generateRandomString(8),
        banner_url: generateRandomString(8),
        profile_url: generateRandomString(8),
        username: generateRandomString(8),
        display_name: generateRandomString(8),
      },
      source_tld: generateRandomString(8),
      source_post_url: generateRandomString(8),
      update_datetime: generateRandomString(8),
      create_datetime: generateRandomString(8),
      import_datetime: generateRandomString(8),
      trending_datetime: generateRandomString(8),
      images: {
        // Define the images object schema here if needed
      },
      title: generateRandomString(8),
      alt_text: generateRandomString(8),
    };
    mockGifs.push(mockGif);
  }
  return mockGifs;
}

const meta = {
  title: "components/giphy/ListTrending",
  component: ListTrending,
  parameters: {},
  argTypes: {},
  args: {
    data: generateMockGifs(10),
    isLoading: false,
    hasNextPage: true,
    fetchNextPage: fn(),
  },
} satisfies Meta<typeof ListTrending>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const loadingNoData: Story = {
  args: {
    data: [],
    isLoading: true,
  },
};

export const LoadingWithData: Story = {
  args: {
    isLoading: true,
  },
};
