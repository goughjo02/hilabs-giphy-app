"use client";
import { ListGifs } from "@/components/giphy/list-gifs";
import { useListTrending } from "@/hooks/use-list-trending";

export default function Home() {
  const { data, isLoading, hasNextPage, fetchNextPage } = useListTrending();
  return (
    <main>
      <div className="container mx-auto">
        <h1 className="pt-4 pb-8 px-2 text-2xl ">{"Trending Gifs"}</h1>
      </div>
      <ListGifs
        data={data}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </main>
  );
}
