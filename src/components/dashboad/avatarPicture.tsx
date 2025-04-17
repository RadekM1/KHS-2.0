"use client";
import { useSessionContext } from "@/src/context/session-provider";
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

export default function AvatarPicture({
  handleCLick,
}: {
  handleCLick: () => void;
}) {
  const [imageSrc, setImageSrc] = useState("");
  const session = useSessionContext();
  useEffect(() => {
    if (!session) return;
    const url = `${session.user.avatar}?v=${Date.now()}`;

    fetch(url, { method: "HEAD" })
      .then((res) => {
        const ct = res.headers.get("content-type") || "";
        if (res.ok && ct.startsWith("image/")) {
          setImageSrc(url);
        }
      })
      .catch(() => {
        setImageSrc(
          "https://storage.googleapis.com/khs-zlin/avatars/User-avatar.svg.png",
        );
      });
  }, [session]);

  return (
    <div className="group relative h-32 w-32">
      <img
        src={
          imageSrc
            ? `${imageSrc}?v=${Date.now()}`
            : "https://storage.googleapis.com/khs-zlin/avatars/User-avatar.svg.png"
        }
        alt="Profile"
        className="h-full w-full rounded-full object-cover"
        width={100}
        height={100}
      />
      <div
        onClick={() => {
          handleCLick();
        }}
        className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-80 opacity-30 transition-opacity duration-300 group-hover:opacity-100 hover:cursor-pointer"
      >
        <button
          onClick={() => {
            handleCLick();
          }}
          className="text-xl text-white"
        >
          <FaEdit className="absolute bottom-0 left-12 flex h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
