"use client";
import { type useListTrending } from "@/hooks/use-list-trending";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { createContext, type ReactNode, useContext } from "react";
import {
  ListTrendingItemsArray,
  ListTrendingItemsArraySchema,
} from "../schema/list-trending-response-schema";

type Item = ReturnType<typeof useListTrending>["data"][number];

type FavoritesContext = {
  favorites: Item[];
  addFavorite: (newFavorite: Item) => void;
  removeFavoriteById: (id: string) => void;
};

export const favoritesContext = createContext<FavoritesContext | null>(null);

export const useFavorites = () => {
  const context = useContext(favoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage<ListTrendingItemsArray>({
    key: "favorites",
    initialValue: [],
    dataValidator: (data) => {
      const parsed = ListTrendingItemsArraySchema.safeParse(data);
      return parsed.success;
    },
  });

  const addFavorite = (newFavorite: Item) => {
    setFavorites([...favorites, newFavorite]);
  };

  const removeFavoriteById = (id: string) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  };

  return (
    <favoritesContext.Provider
      value={{ favorites, addFavorite, removeFavoriteById }}
    >
      {children}
    </favoritesContext.Provider>
  );
};
