"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { LikeIcon } from "../ui/like-icon";
import { type useListTrending } from "@/hooks/use-list-trending";
import { useFavorites } from "@/components/providers/favorites-provider";

type Gif = ReturnType<typeof useListTrending>["data"][number];

type LikeButtonProps = {
  gif: Gif;
};

export const LikeButton = ({ gif }: LikeButtonProps) => {
  const { favorites, addFavorite, removeFavoriteById } = useFavorites();
  const handleLikeClicked = (item: Gif) => {
    if (favorites.some((fav) => fav.id === item.id)) {
      removeFavoriteById(item.id);
    } else {
      addFavorite(item);
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleLikeClicked(gif);
          }}
        >
          <LikeIcon isLiked={favorites.some((fav) => fav.id === gif.id)} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {favorites.some((fav) => fav.id === gif.id)
          ? "Remove from favorites"
          : "Add to favorites"}
      </TooltipContent>
    </Tooltip>
  );
};
