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
import { LikeIcon } from "../ui/like-icon";

type ListTrendingProps = {
  data: ReturnType<typeof useListTrending>["data"];
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

export const ListTrending = ({
  data,
  isLoading,
  hasNextPage,
  fetchNextPage,
}: ListTrendingProps) => {
  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (loadMoreButtonRef.current) {
      observer.observe(loadMoreButtonRef.current);
    }

    return () => {
      if (loadMoreButtonRef.current) {
        observer.unobserve(loadMoreButtonRef.current);
      }
    };
  }, [hasNextPage, isLoading]);
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
      <h1 className="pt-4 pb-8 px-2 text-2xl ">Trending Gifs</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {hasData &&
          data.map((gif) => (
            <Dialog key={gif.id}>
              <DialogTrigger>
                <div className="flex items-center justify-center p-4 bg-primary/20 rounded-md gap-4">
                  <div className="flex-grow flex items-center justify-center">
                    <p className="">{gif.title}</p>
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeClicked(gif);
                      }}
                    >
                      <LikeIcon
                        isLiked={favorites.some((fav) => fav.id === gif.id)}
                      />
                    </Button>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        handleLikeClicked(gif);
                      }}
                    >
                      <LikeIcon
                        isLiked={favorites.some((fav) => fav.id === gif.id)}
                      />
                    </Button>
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
    </div>
  );
};
