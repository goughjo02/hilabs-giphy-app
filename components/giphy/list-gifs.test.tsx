import { cleanup, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { mockGifOne, mockGifTwo } from "@/hooks/use-list-trending.test";
import { render } from "@/lib/test-helpers";
import userEvent from "@testing-library/user-event";
import { ListGifs } from "./list-gifs";
import { favoritesContext } from "../providers/favorites-provider";

describe("ListGifs", () => {
  afterEach(() => {
    cleanup();
  });
  test("renders items that are clickable and open a dialog with add to favorites button", async () => {
    const addFavorite = vi.fn();
    const removeFavoriteById = vi.fn();
    render(
      <favoritesContext.Provider
        value={{
          favorites: [],
          addFavorite,
          removeFavoriteById,
        }}
      >
        <ListGifs
          data={[mockGifOne, mockGifTwo]}
          isLoading={false}
          hasNextPage={false}
          fetchNextPage={vi.fn()}
        />
      </favoritesContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("title-one")).toBeDefined();
    });
    const gifTwo = screen.getByText("title-two");
    await userEvent.click(gifTwo);
    const addToFavoritesButton = screen.getByRole("button", {
      name: "Add to favorites",
    });
    expect(addFavorite).toHaveBeenCalledTimes(0);
    await userEvent.click(addToFavoritesButton);
    expect(addFavorite).toHaveBeenCalledTimes(1);
    expect(addFavorite).toHaveBeenCalledWith(mockGifTwo);
  });
  test("renders items that are clickable and open a dialog with remove from favorites button if gif is already a favorite", async () => {
    const addFavorite = vi.fn();
    const removeFavoriteById = vi.fn();
    render(
      <favoritesContext.Provider
        value={{
          favorites: [mockGifTwo],
          addFavorite,
          removeFavoriteById,
        }}
      >
        <ListGifs
          data={[mockGifOne, mockGifTwo]}
          isLoading={false}
          hasNextPage={false}
          fetchNextPage={vi.fn()}
        />
      </favoritesContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByText("title-one")).toBeDefined();
    });
    const gifTwo = screen.getByText("title-two");
    await userEvent.click(gifTwo);
    const removeButton = screen.getByRole("button", {
      name: "Remove from favorites",
    });
    expect(removeFavoriteById).toHaveBeenCalledTimes(0);
    await userEvent.click(removeButton);
    expect(removeFavoriteById).toHaveBeenCalledTimes(1);
    expect(removeFavoriteById).toHaveBeenCalledWith(mockGifTwo.id);
  });
});
