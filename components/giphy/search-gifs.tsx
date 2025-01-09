"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ListGifs } from "./list-gifs";
import { useSearch } from "@/hooks/use-search";

export const SearchGifs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);
  const enabled = debouncedSearchQuery.length > 0;
  const { data, hasNextPage, fetchNextPage, isLoading } = useSearch({
    searchQuery: debouncedSearchQuery,
    enabled,
  });
  return (
    <div>
      <div className="container mx-auto">
        <h1 className="pt-4 pb-8 px-2 text-2xl ">{"Search Gifs"}</h1>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search GIFs"
        />
      </div>
      <ListGifs
        data={data}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        enabled={enabled}
      />
    </div>
  );
};
