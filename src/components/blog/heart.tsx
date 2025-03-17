"use client";

import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { useSessionContext } from "@/src/context/session-provider";

interface HeartProps {
  likes: number;
  heartsList: {
    account: string;
    nickname: string;
    avatar: string;
  }[];
  slug: string;
}

export const Heart = ({ likes, heartsList, slug }: HeartProps) => {
  const { data: session } = useSession();
  const [clicked, setClicked] = useState(false);
  const [clicks, setClicks] = useState(likes);
  const sessionContext = useSessionContext();

  useEffect(() => {
    if (sessionContext) {
      if (true) {
        setClicked(true);
      } else {
        setClicked(false);
      }
    }
  }, [session, heartsList]);

  const handleClick = async () => {
    setClicks(clicks + 1);
    setClicked(true);

    if (!user) {
      alert("nebyl zjištěn přihlášený uživatel");
      return;
    }

    if (!slug) {
      alert("chyba při zjištění ID článku");
      return;
    }

    try {
      const response = await fetch("/api/hearts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          article_slug_heart: slug,
          user_account_heart: user,
          operation: "insert",
        }),
      });

      if (!response.ok) {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tooltip title={!sessionContext ? "Je potřeba být přihlášený" : ""} arrow>
      <div className="relative">
        {clicked ? (
          <Chip
            icon={<FavoriteIcon color="error" />}
            label={clicks}
            className="dark:text-gray-300"
            variant="outlined"
            onClick={sessionContext && !clicked ? handleClick : undefined}
            style={
              !sessionContext ? { cursor: "not-allowed", opacity: 0.6 } : {}
            }
          />
        ) : (
          <Chip
            icon={<FavoriteBorderIcon style={{ color: "#9e9e9e" }} />}
            label={clicks}
            className="dark:text-gray-300"
            variant="outlined"
            onClick={sessionContext ? handleClick : undefined}
            style={
              !sessionContext ? { cursor: "not-allowed", opacity: 0.6 } : {}
            }
          />
        )}
      </div>
    </Tooltip>
  );
};
