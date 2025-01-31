"use client";
import { type useListTrending } from "@/hooks/use-list-trending";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";
import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFavorites } from "../providers/favorites-provider";
import { LikeButton } from "./like-button";

type ListTrendingProps = {
  data: ReturnType<typeof useListTrending>["data"];
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  enabled?: boolean;
};

export const ListGifs = ({
  data,
  isLoading,
  hasNextPage,
  fetchNextPage,
  enabled = true,
}: ListTrendingProps) => {
  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const loadMoreButton = loadMoreButtonRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading && enabled) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (loadMoreButton) {
      observer.observe(loadMoreButton);
    }

    return () => {
      if (loadMoreButton) {
        observer.unobserve(loadMoreButton);
      }
    };
  }, [hasNextPage, isLoading, enabled, fetchNextPage]);
  const hasData = data.length > 0;
  const { favorites, addFavorite, removeFavoriteById } = useFavorites();
  const handleLikeClicked = (item: (typeof data)[0]) => {
    if (favorites.some((fav) => fav.id === item.id)) {
      removeFavoriteById(item.id);
    } else {
      addFavorite(item);
    }
  };
  return (
    <div className="container mx-auto pt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {hasData &&
          data.map((gif) => (
            <Dialog key={gif.id}>
              <DialogTrigger asChild>
                <div className="flex items-center justify-center p-4 bg-primary/20 rounded-md gap-4 cursor-pointer">
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-center">{gif.title}</p>
                  </div>
                  <div>
                    <LikeButton gif={gif} />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <LikeButton gif={gif} />
                    {gif.title}
                  </DialogTitle>
                  <DialogDescription>
                    <iframe
                      src={gif.embed_url}
                      width="480"
                      height="270"
                      frameBorder="0"
                      className="w-full"
                    ></iframe>
                  </DialogDescription>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        handleLikeClicked(gif);
                      }}
                    >
                      {favorites.some((fav) => fav.id === gif.id)
                        ? "Remove from favorites"
                        : "Add to favorites"}
                    </Button>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        {isLoading && (
          <>
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </>
        )}
      </div>
      {enabled && (
        <div className="p-4 mt-4 ">
          {hasNextPage ? (
            <Button
              type="button"
              variant={"ghost"}
              onClick={fetchNextPage}
              disabled={isLoading || !hasNextPage}
              ref={loadMoreButtonRef}
            >
              {isLoading ? "Loading..." : "Load more"}
            </Button>
          ) : (
            <p>No more gifs to load</p>
          )}
        </div>
      )}
    </div>
  );
};
