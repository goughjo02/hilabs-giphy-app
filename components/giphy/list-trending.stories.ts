import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ListTrending } from "./list-trending";
import { generateMockGifs } from "@/lib/generate-mock-gifs";

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
