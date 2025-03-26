import { Heart } from "@/src/components/blog/heart";
import { singleHeartFetch } from "@/src/lib/server-functions/frontend/single-heart-fetch";

export const HeartFetchCover = async ({ slug }: { slug: string }) => {
  const data = await singleHeartFetch(slug);

  return (
    <Heart
      slug={data.slug}
      heartsList={data.liked_by ?? null}
      likes={data.likes}
    />
  );
};
