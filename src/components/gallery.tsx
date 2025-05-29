"use client";

import { useState } from "react";
import Image from "next/image";
import { ImgInGallerySchema } from "../schemas/gallery";
import LightBox from "./ui/lightbox";

interface ProductGallery {
  gallery: ImgInGallerySchema[];
}

export const Gallery = ({ gallery }: ProductGallery) => {
  const [activeId, setActiveId] = useState<number>(0);
  const [toggler, setToggler] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean[]>(
    new Array(gallery.length).fill(false),
  );

  const handleImgClick = (id: number) => {
    setActiveId(id);
    setToggler(true);
  };

  const handleLoad = (i: number) => {
    setLoaded((prev) => {
      const tempLoaded = [...prev];
      tempLoaded[i] = true;
      return tempLoaded;
    });
  };

  return (
    <>
      <div className="flex w-full px-4 pb-4 items-center justify-center">
        <div className="my-10 flex flex-wrap sm:grid sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 self-center justify-start w-full">
          {gallery.map((img, i) => (
            <div
              key={i}
              id={`img-${i}`}
              onClick={() => handleImgClick(i)}
              className={`cursor-pointer group relative w-[47%] sm:w-full h-[150px] sm:h-[200px] rounded-md overflow-hidden
                ${!loaded[i] ? "bg-gray-200 animate-pulse" : ""}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={500}
                height={500}
                sizes="(max-width: 640px) 47vw, (max-width: 1024px) 33vw, 200px"
                loading="lazy"
                onLoad={() => handleLoad(i)}
                className={`object-cover rounded-md h-full w-full transition-all duration-300 ease-in-out group-hover:brightness-50 
                  ${loaded[i] ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          ))}
        </div>
      </div>
      <LightBox
        input={gallery}
        active={activeId}
        toggler={toggler}
        setToggler={setToggler}
      />
    </>
  );
};
