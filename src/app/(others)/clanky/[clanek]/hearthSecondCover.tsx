"use client";

import { Heart } from "@/src/components/blog/heart";
import { singleHeartFetch } from "@/src/lib/server-functions/frontend/single-heart-fetch";
import { useEffect, useState } from "react";
import { SingleHeartSchema } from "@/src/schemas/queries/heart";

export const HeartFetchSecondCover = ({ slug }: { slug: string }) => {
  const [fetchedData, setFetchedData] = useState<SingleHeartSchema | []>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await singleHeartFetch(slug);
    setFetchedData({
      slug: data.slug,
      hearts_count: data.likes,
      liked_by: data.liked_by ?? [],
    });
  };

  return (
    <Heart
      slug={slug}
      heartsList={
        "liked_by" in fetchedData ? (fetchedData.liked_by ?? null) : null
      }
      likes={"hearts_count" in fetchedData ? fetchedData.hearts_count : 0}
    />
  );
};
