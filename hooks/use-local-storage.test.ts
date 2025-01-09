import { describe, test, expect, beforeEach, vi } from "vitest";
import { useLocalStorage } from "./use-local-storage";
import { renderHook } from "@testing-library/react";

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

describe("useLocalStorage", () => {
  beforeEach(() => {
    // Setup mock localStorage before each test
    const mockStorage = new MockLocalStorage();
    vi.stubGlobal("localStorage", mockStorage);
  });
  test("should return initial value", () => {
    const { result } = renderHook(() =>
      useLocalStorage({ key: "some-key", initialValue: "test" })
    );
    expect(result.current[0]).toBe("test");
  });
  test("should return localStorage value", () => {
    localStorage.setItem("some-key", JSON.stringify("stored value"));
    const { result } = renderHook(() =>
      useLocalStorage({
        key: "some-key",
        initialValue: "test",
      })
    );
    expect(result.current[0]).toBe("stored value");
  });
  test("should return initial value if localStorage value is invalid", () => {
    localStorage.setItem("some-key", JSON.stringify({ invalid: "data" }));
    const { result } = renderHook(() =>
      useLocalStorage({
        key: "some-key",
        initialValue: "test",
        dataValidator: (data) => typeof data === "string",
      })
    );
    expect(result.current[0]).toBe("test");
  });
  test("should set localStorage value", () => {
    const { result } = renderHook(() =>
      useLocalStorage({
        key: "some-key",
        initialValue: "test",
      })
    );
    result.current[1]("new value");
    expect(localStorage.getItem("some-key")).toBe(JSON.stringify("new value"));
  });
});
