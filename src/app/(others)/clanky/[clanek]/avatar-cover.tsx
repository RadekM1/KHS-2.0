"use client";
import Image from "next/image";
import { useState } from "react";

export const AvatarCover = ({ avatar }: { avatar: string }) => {
  const [avatarSrc, setAvatarSrc] = useState(avatar);
  const avatarFallback =
    "https://storage.googleapis.com/khs-zlin/avatars/User-avatar.svg.png";

  return (
    <Image
      width={30}
      height={30}
      alt="avatar uživatele"
      src={avatarSrc}
      onError={() => setAvatarSrc(avatarFallback)}
      className="inline-block h-6 w-6 self-center rounded-full object-fill ring-2 ring-white dark:ring-[#1E1E1E]"
    />
  );
};
