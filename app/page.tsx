"use client";
import { ListTrending } from "@/components/giphy/list-trending";
import { useListTrending } from "@/hooks/use-list-trending";

export default function Home() {
  const { data, isLoading, hasNextPage, fetchNextPage } = useListTrending();
  return (
    <main>
      <ListTrending
        data={data}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </main>
  );
}
