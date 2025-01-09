import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ListGifs } from "./list-gifs";
import { generateMockGifs } from "@/lib/generate-mock-gifs";
import { favoritesContext } from "@/components/providers/favorites-provider";

const mockData = generateMockGifs(10);

const meta = {
  title: "components/giphy/ListGifs",
  component: ListGifs,
  parameters: {},
  argTypes: {},
  args: {
    data: mockData,
    isLoading: false,
    hasNextPage: true,
    fetchNextPage: fn(),
  },
  decorators: [
    (Story) => (
      <favoritesContext.Provider
        value={{
          favorites: [mockData[2], mockData[5], mockData[7]],
          addFavorite: fn(),
          removeFavoriteById: fn(),
        }}
      >
        <Story />
      </favoritesContext.Provider>
    ),
  ],
} satisfies Meta<typeof ListGifs>;

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
