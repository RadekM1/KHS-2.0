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

  const handleImgClick = (id: number) => {
    setActiveId(id);
    setToggler(true);
  };

  console.log(gallery);

  return (
    <>
      <div className="flex w-full px-4 pb-4 items-center justify-center">
        <div className=" my-10 flex flex-wrap sm:grid sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4  self-center justify-start w-full">
          {gallery.map((img, i) => {
            return (
              <div
                key={i}
                onClick={() => handleImgClick(i)}
                className="cursor-pointer group relative min-h-max w-[47%] sm:w-full h-full object-cover"
              >
                <Image
                  className=" object-cover rounded-md h-[150px] sm:h-[200px] duration-300 ease-in-out group-hover:brightness-50 self-center flex"
                  src={img.src}
                  alt={img.alt}
                  width={500}
                  height={500}
                  loading="eager"
                  priority={true}
                />
              </div>
            );
          })}
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
