import { describe, test, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { FavoritesProvider, useFavorites } from "./favorites-provider";
import { generateMockGifs } from "@/lib/generate-mock-gifs";

// mockLocalStorage.ts
class MockLocalStorage {
  private store: { [key: string]: string } = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  key(index: number) {
    return Object.keys(this.store)[index] || null;
  }

  get length() {
    return Object.keys(this.store).length;
  }
}

describe("FavoritesProvider", () => {
  beforeEach(() => {
    // Setup mock localStorage before each test
    const mockStorage = new MockLocalStorage();
    vi.stubGlobal("localStorage", mockStorage);
  });
  test("should return initial value", () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: ({ children }) => (
        <FavoritesProvider>{children}</FavoritesProvider>
      ),
    });
    expect(result.current.favorites).toEqual([]);
  });
  test("gets fro localStorage", () => {
    localStorage.setItem("favorites", JSON.stringify(generateMockGifs(12)));
    const { result } = renderHook(() => useFavorites(), {
      wrapper: ({ children }) => (
        <FavoritesProvider>{children}</FavoritesProvider>
      ),
    });
    expect(result.current.favorites.length).toEqual(12);
  });
  test("adds a favorite", async () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: ({ children }) => (
        <FavoritesProvider>{children}</FavoritesProvider>
      ),
    });
    result.current.addFavorite(generateMockGifs(1)[0]);
    await waitFor(() => {
      expect(result.current.favorites.length).toEqual(1);
    });
  });
  test("removes a favorite", async () => {
    const mockFavorites = generateMockGifs(12);
    const targetToRemove = mockFavorites[4];
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    const { result } = renderHook(() => useFavorites(), {
      wrapper: ({ children }) => (
        <FavoritesProvider>{children}</FavoritesProvider>
      ),
    });
    expect(result.current.favorites.length).toEqual(12);
    expect(result.current.favorites.map((e) => e.id)).toContain(
      targetToRemove.id
    );
    result.current.removeFavoriteById(targetToRemove.id);
    await waitFor(() => {
      expect(result.current.favorites.length).toEqual(11);
      expect(result.current.favorites.map((e) => e.id)).not.toContain(
        targetToRemove.id
      );
    });
  });
});
